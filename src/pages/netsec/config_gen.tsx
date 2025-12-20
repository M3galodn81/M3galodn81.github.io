import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { uiBackground, bentoCard } from "../../lib/helper";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";

import { 
  Copy, Settings, Network, Shield, 
  Plus, Trash2, Terminal, ArrowLeft, 
  AlertCircle
} from "lucide-react";
import * as Gen from "../../lib/netsec/cisco_config";
import { configInput, configInputSmall, configRowBase } from "../../lib/helper";
import { toast } from "sonner";


// Interfaces
interface Vlan { id: number; name: string; ip?: string; mask?: string; }
interface Iface { 
  name: string; 
  type: 'access' | 'trunk'; 
  vlan?: number; 
  allowed?: string; 
  security?: boolean; 
  maxMacs?: number;
  violation?: 'protect' | 'restrict' | 'shutdown';
  description?: string;
  dhcpTrust?: boolean;
  arpTrust?: boolean;
}

// Validation Regex
const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

export default function DeviceConfiguration() {
  // --- General State ---
  const [hostname, setHostname] = useState("Switch-01");
  const [enableSecret, setEnableSecret] = useState(""); 
  const [consolePassword, setConsolePassword] = useState(""); 
  const [banner, setBanner] = useState("Authorized Access Only");
  
  // --- Security State ---
  const [dhcpSnooping, setDhcpSnooping] = useState(false);
  const [dai, setDai] = useState(false);

  // --- SSH / User ---
  const [domain, setDomain] = useState("corp.local");
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("cisco123");

  // --- Network Services ---
  const [gateway, setGateway] = useState("");
  const [ntp, setNtp] = useState("");
  const [snmp, setSnmp] = useState("");
  const [logging, setLogging] = useState("");

  // --- Lists ---
  const [vlans, setVlans] = useState<Vlan[]>([{ id: 10, name: "Data" }, { id: 20, name: "Voice" }]);
  const [interfaces, setInterfaces] = useState<Iface[]>([
    { name: "Gi0/1", type: "access", vlan: 10, security: true, maxMacs: 2, violation: 'restrict', description: "User PC" },
    { name: "Gi0/24", type: "trunk", allowed: "10,20,99", description: "Uplink", dhcpTrust: true, arpTrust: true }
  ]);

  const [generatedConfig, setGeneratedConfig] = useState("");
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  // --- Validation Logic ---
  const validateIpField = (field: string, value: string) => {
    if (value && !ipRegex.test(value)) {
      setErrors(prev => ({ ...prev, [field]: true }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // --- Logic to Compile Config ---
  useEffect(() => {
    let config = `${Gen.switchDefaultConfig}\n\n`;
    config += `! --- General Settings ---\n`;
    if (hostname) config += `${Gen.generateHostnameConfig(hostname)}\n`;
    if (enableSecret) config += `${Gen.generateEnableSecretConfig(enableSecret)}\n`;
    if (consolePassword) config += `${Gen.generateConsolePasswordConfig(consolePassword)}\n`;
    if (banner) config += `${Gen.generateBannerConfig(banner)}\n`;
    
    // Global Security
    if (dhcpSnooping || dai) {
        const vlanIds = vlans.map(v => v.id);
        config += `\n${Gen.generateGlobalSecurityConfig(dhcpSnooping, dai, vlanIds)}`;
    }

    if (domain && username && password) {
      config += `\n! --- SSH & User Configuration ---\n`;
      config += `${Gen.generateSSHConfig(domain, username, password)}\n`;
    }

    if (vlans.length > 0) {
      config += `\n! --- VLAN Configuration ---\n`;
      vlans.forEach(v => {
        config += `${Gen.generateVLANConfig(v.id, v.name)}\n`;
        if (v.ip && v.mask) {
          config += `${Gen.generateVLANInterfaceConfig(v.id, v.ip, v.mask)}\n`;
        }
      });
    }

    if (interfaces.length > 0) {
      config += `\n! --- Interface Configuration ---\n`;
      interfaces.forEach(i => {
        if (i.type === 'access' && i.vlan) {
          config += `${Gen.generateInterfaceConfig(i.name, i.vlan, i.description, i.dhcpTrust, i.arpTrust)}\n`;
          if (i.security && i.maxMacs) {
            config += `${Gen.generatePortSecurityConfig(i.name, i.maxMacs, i.violation || 'restrict')}\n`;
          }
        } else if (i.type === 'trunk' && i.allowed) {
          config += `${Gen.generateTrunkInterfaceConfig(i.name, i.allowed, i.description, i.dhcpTrust, i.arpTrust)}\n`;
        }
      });
    }

    config += `\n! --- Network Services ---\n`;
    if (gateway && !errors.gateway) config += `${Gen.generateDefaultGatewayConfig(gateway)}\n`;
    if (ntp && !errors.ntp) config += `${Gen.generateNTPConfig(ntp)}\n`;
    if (snmp) config += `${Gen.generateSNMPConfig(snmp)}\n`;
    if (logging && !errors.logging) config += `${Gen.generateLoggingConfig(logging)}\n`;

    config += `\n${Gen.switchEndConfig}`;
    setGeneratedConfig(config);
  }, [hostname, enableSecret, consolePassword, banner, dhcpSnooping, dai, domain, username, password, gateway, ntp, snmp, logging, vlans, interfaces, errors]);

  // --- Handlers ---
  const copyToClipboard = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(generatedConfig)
        .then(() => toast.success("Configuration copied to clipboard"))
        .catch(() => toast.error("Failed to copy"));
    } else {
      // Fallback
      try {
        const textarea = document.createElement("textarea");
        textarea.value = generatedConfig;
        textarea.style.position = "fixed"; // Avoid scrolling to bottom
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        toast.success("Configuration copied to clipboard");
      } catch (err) {
        toast.error("Failed to copy manually");
      }
    }
  };

  const addVlan = () => setVlans([...vlans, { id: 10 + vlans.length * 10, name: "New_VLAN" }]);
  const removeVlan = (idx: number) => setVlans(vlans.filter((_, i) => i !== idx));
  const updateVlan = (idx: number, field: keyof Vlan, value: any) => {
    const newVlans = [...vlans];
    newVlans[idx] = { ...newVlans[idx], [field]: value };
    setVlans(newVlans);
  };

  const addInterface = () => setInterfaces([...interfaces, { name: "Gi0/1", type: "access", vlan: 10, violation: 'restrict' }]);
  const removeInterface = (idx: number) => setInterfaces(interfaces.filter((_, i) => i !== idx));
  const updateInterface = (idx: number, field: keyof Iface, value: any) => {
    const newInterfaces = [...interfaces];
    newInterfaces[idx] = { ...newInterfaces[idx], [field]: value };
    setInterfaces(newInterfaces);
  };

  return (
    <div className={`min-h-screen w-screen flex flex-col items-center p-4 sm:p-8 ${uiBackground} animate-in fade-in duration-700`}>
      
      {/* Header */}
      <div className="max-w-7xl w-full mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white mb-2">Config Generator</h1>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">Automate your Cisco IOS switch setup.</p>
        </div>
        <Link to="/" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline mb-1 flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back Home
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl w-full">
        
        {/* LEFT COLUMN: Controls */}
        <div className="lg:col-span-2 space-y-6">
           <div className={bentoCard}>
             <Tabs defaultValue="general">
               <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-6 h-auto gap-2">
                 <TabsTrigger value="general" className="flex items-center gap-2"><Settings className="w-4 h-4" /> General</TabsTrigger>
                 <TabsTrigger value="vlans" className="flex items-center gap-2"><Network className="w-4 h-4" /> VLANs</TabsTrigger>
                 <TabsTrigger value="interfaces" className="flex items-center gap-2"><Terminal className="w-4 h-4" /> Interface</TabsTrigger>
                 <TabsTrigger value="services" className="flex items-center gap-2"><Shield className="w-4 h-4" /> Services</TabsTrigger>
               </TabsList>

               {/* General Tab */}
               <TabsContent value="general" className="space-y-4">
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <div className="space-y-2">
                     <Label>Hostname</Label>
                     <Input value={hostname} onChange={(e) => setHostname(e.target.value)} className={configInput} />
                   </div>
                   <div className="space-y-2">
                     <Label>Banner Message</Label>
                     <Input value={banner} onChange={(e) => setBanner(e.target.value)} className={configInput} />
                   </div>
                   <div className="space-y-2">
                     <Label>Enable Secret (Privileged)</Label>
                     <Input type="password" value={enableSecret} onChange={(e) => setEnableSecret(e.target.value)} className={configInput} placeholder="Optional" />
                   </div>
                   <div className="space-y-2">
                     <Label>Console Password (User EXEC)</Label>
                     <Input type="password" value={consolePassword} onChange={(e) => setConsolePassword(e.target.value)} className={configInput} placeholder="Optional" />
                   </div>
                 </div>

                 <div className="border-t border-slate-200 dark:border-white/10 my-4"></div>
                 
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-3">SSH & User</h3>
                        <div className="space-y-3">
                            <div className="space-y-1">
                                <Label className="text-xs">Domain Name</Label>
                                <Input value={domain} onChange={(e) => setDomain(e.target.value)} className={configInputSmall} />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-xs">Username</Label>
                                <Input value={username} onChange={(e) => setUsername(e.target.value)} className={configInputSmall} />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-xs">Password</Label>
                                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={configInputSmall} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-3">Global Security</h3>
                        <div className="space-y-3 p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                             <div className="flex items-center gap-2">
                                <input type="checkbox" id="dhcp" checked={dhcpSnooping} onChange={(e) => setDhcpSnooping(e.target.checked)} className="rounded border-slate-300" />
                                <Label htmlFor="dhcp" className="cursor-pointer">DHCP Snooping</Label>
                             </div>
                             <div className="flex items-center gap-2">
                                <input type="checkbox" id="dai" checked={dai} onChange={(e) => setDai(e.target.checked)} className="rounded border-slate-300" />
                                <Label htmlFor="dai" className="cursor-pointer">Dynamic ARP Inspection</Label>
                             </div>
                             <p className="text-[10px] text-slate-500 mt-2 leading-tight">Enables features globally for all active VLANs defined in the VLANs tab.</p>
                        </div>
                    </div>
                 </div>
               </TabsContent>

               {/* VLANs Tab */}
               <TabsContent value="vlans" className="space-y-4">
                 {vlans.map((vlan, idx) => (
                   <div key={idx} className={configRowBase}>
                     <div className="w-full sm:w-20 space-y-1">
                        <Label className="text-xs">ID</Label>
                        <Input type="number" value={vlan.id} onChange={(e) => updateVlan(idx, 'id', parseInt(e.target.value))} className={configInputSmall} />
                     </div>
                     <div className="w-full sm:flex-1 space-y-1">
                        <Label className="text-xs">Name</Label>
                        <Input value={vlan.name} onChange={(e) => updateVlan(idx, 'name', e.target.value)} className={configInputSmall} />
                     </div>
                     <div className="w-full sm:w-32 space-y-1">
                        <Label className="text-xs">SVI IP (Opt)</Label>
                        <Input value={vlan.ip || ''} onChange={(e) => updateVlan(idx, 'ip', e.target.value)} className={configInputSmall} placeholder="192.168.1.1" />
                     </div>
                     <Button variant="destructive" size="icon" className="h-8 w-8 sm:mb-0.5" onClick={() => removeVlan(idx)}><Trash2 className="w-4 h-4" /></Button>
                   </div>
                 ))}
                 <Button variant="outline" onClick={addVlan} className="w-full border-dashed border-slate-300 dark:border-slate-600 hover:border-slate-400">
                    <Plus className="w-4 h-4 mr-2" /> Add VLAN
                 </Button>
               </TabsContent>

               {/* Interfaces Tab */}
               <TabsContent value="interfaces" className="space-y-4">
                 {interfaces.map((iface, idx) => (
                   <div key={idx} className={`${configRowBase} items-stretch`}>
                      <div className="flex flex-col gap-3 w-full">
                          {/* Top Row: Basic Info */}
                          <div className="flex flex-col sm:flex-row gap-3">
                            <div className="w-full sm:w-32 space-y-1">
                                <Label className="text-xs">Interface</Label>
                                <Input value={iface.name} onChange={(e) => updateInterface(idx, 'name', e.target.value)} className={configInputSmall} placeholder="Gi0/1" />
                            </div>
                            <div className="w-full sm:flex-1 space-y-1">
                                <Label className="text-xs">Description</Label>
                                <Input value={iface.description || ''} onChange={(e) => updateInterface(idx, 'description', e.target.value)} className={configInputSmall} placeholder="e.g. Printer" />
                            </div>
                            <div className="w-full sm:w-24 space-y-1">
                                <Label className="text-xs">Mode</Label>
                                <select 
                                  className="w-full h-8 rounded-md border border-slate-200 bg-white px-2 text-xs dark:border-slate-800 dark:bg-slate-950"
                                  value={iface.type}
                                  onChange={(e) => updateInterface(idx, 'type', e.target.value)}
                                >
                                    <option value="access">Access</option>
                                    <option value="trunk">Trunk</option>
                                </select>
                            </div>
                          </div>
                          
                          {/* Bottom Row: Conditional Fields */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-200 dark:border-white/10">
                              {/* Left: VLAN / Security */}
                              <div className="space-y-2">
                                {iface.type === 'access' ? (
                                    <div className="flex flex-col sm:flex-row gap-2">
                                        <div className="w-full sm:w-20 space-y-1">
                                            <Label className="text-[10px] text-slate-500">VLAN ID</Label>
                                            <Input type="number" value={iface.vlan} onChange={(e) => updateInterface(idx, 'vlan', parseInt(e.target.value))} className="h-7 text-xs bg-white dark:bg-slate-950" />
                                        </div>
                                        <div className="flex-1 space-y-1 pt-4 sm:pt-0 sm:self-center">
                                            <div className="flex items-center gap-2">
                                                <input type="checkbox" id={`sec-${idx}`} checked={iface.security || false} onChange={(e) => updateInterface(idx, 'security', e.target.checked)} className="rounded border-slate-300" />
                                                <Label htmlFor={`sec-${idx}`} className="text-xs cursor-pointer">Port Security</Label>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-1">
                                        <Label className="text-[10px] text-slate-500">Allowed VLANs</Label>
                                        <Input value={iface.allowed || ''} onChange={(e) => updateInterface(idx, 'allowed', e.target.value)} className="h-7 text-xs bg-white dark:bg-slate-950" placeholder="10,20,30" />
                                    </div>
                                )}

                                {/* Port Security Detail */}
                                {iface.type === 'access' && iface.security && (
                                    <div className="flex flex-col sm:flex-row gap-2 pl-4 border-l-2 border-slate-200">
                                        <div className="w-full sm:w-20 space-y-1">
                                            <Label className="text-[10px]">Max MACs</Label>
                                            <Input type="number" value={iface.maxMacs || 1} onChange={(e) => updateInterface(idx, 'maxMacs', parseInt(e.target.value))} className="h-7 text-xs bg-white dark:bg-slate-950" />
                                        </div>
                                        <div className="w-full sm:flex-1 space-y-1">
                                            <Label className="text-[10px]">Violation</Label>
                                            <select 
                                            className="w-full h-7 rounded-md border border-slate-200 bg-white px-2 text-xs dark:border-slate-800 dark:bg-slate-950"
                                            value={iface.violation || 'restrict'}
                                            onChange={(e) => updateInterface(idx, 'violation', e.target.value)}
                                            >
                                                <option value="protect">Protect</option>
                                                <option value="restrict">Restrict</option>
                                                <option value="shutdown">Shutdown</option>
                                            </select>
                                        </div>
                                    </div>
                                )}
                              </div>

                              {/* Right: Trust Features */}
                              <div className="space-y-2">
                                <Label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Snooping & Inspection</Label>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2">
                                        <input type="checkbox" id={`dhcp-${idx}`} checked={iface.dhcpTrust || false} onChange={(e) => updateInterface(idx, 'dhcpTrust', e.target.checked)} className="rounded border-slate-300" />
                                        <Label htmlFor={`dhcp-${idx}`} className="text-xs cursor-pointer">DHCP Snooping Trust</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input type="checkbox" id={`arp-${idx}`} checked={iface.arpTrust || false} onChange={(e) => updateInterface(idx, 'arpTrust', e.target.checked)} className="rounded border-slate-300" />
                                        <Label htmlFor={`arp-${idx}`} className="text-xs cursor-pointer">ARP Inspection Trust</Label>
                                    </div>
                                </div>
                              </div>
                          </div>
                      </div>
                      <Button variant="destructive" size="icon" className="h-8 w-8 sm:mt-6 self-end sm:self-start" onClick={() => removeInterface(idx)}><Trash2 className="w-4 h-4" /></Button>
                   </div>
                 ))}
                 <Button variant="outline" onClick={addInterface} className="w-full border-dashed border-slate-300 dark:border-slate-600 hover:border-slate-400">
                    <Plus className="w-4 h-4 mr-2" /> Add Interface
                 </Button>
               </TabsContent>

               {/* Services Tab */}
               <TabsContent value="services" className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                            <Label>Default Gateway</Label>
                            {errors.gateway && <span className="text-[10px] text-red-500 flex items-center"><AlertCircle className="w-3 h-3 mr-1"/>Invalid IP</span>}
                        </div>
                        <Input 
                            value={gateway} 
                            onChange={(e) => { setGateway(e.target.value); validateIpField('gateway', e.target.value); }} 
                            placeholder="192.168.1.254" 
                            className={`${configInput} ${errors.gateway ? 'border-red-500 focus-visible:ring-red-500' : ''}`} 
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                            <Label>NTP Server</Label>
                            {errors.ntp && <span className="text-[10px] text-red-500 flex items-center"><AlertCircle className="w-3 h-3 mr-1"/>Invalid IP</span>}
                        </div>
                        <Input 
                            value={ntp} 
                            onChange={(e) => { setNtp(e.target.value); validateIpField('ntp', e.target.value); }} 
                            placeholder="192.168.1.10" 
                            className={`${configInput} ${errors.ntp ? 'border-red-500 focus-visible:ring-red-500' : ''}`} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>SNMP Community</Label>
                        <Input value={snmp} onChange={(e) => setSnmp(e.target.value)} placeholder="public" className={configInput} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                            <Label>Syslog Server</Label>
                            {errors.logging && <span className="text-[10px] text-red-500 flex items-center"><AlertCircle className="w-3 h-3 mr-1"/>Invalid IP</span>}
                        </div>
                        <Input 
                            value={logging} 
                            onChange={(e) => { setLogging(e.target.value); validateIpField('logging', e.target.value); }} 
                            placeholder="192.168.1.50" 
                            className={`${configInput} ${errors.logging ? 'border-red-500 focus-visible:ring-red-500' : ''}`} 
                        />
                      </div>
                  </div>
               </TabsContent>
             </Tabs>
           </div>
        </div>

        {/* RIGHT COLUMN: Output */}
        <div className="lg:col-span-1">
           <div className={`${bentoCard} sticky top-6 flex flex-col h-[600px] lg:h-[calc(100vh-8rem)]`}>
              <div className="flex justify-between items-center mb-4">
                 <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-emerald-500" /> Output
                 </h2>
                 <Button size="sm" variant="outline" onClick={copyToClipboard} className="text-xs"><Copy className="w-4 h-4" />Copy</Button>
              </div>
              
              <Textarea 
                value={generatedConfig} 
                readOnly 
                className="flex-1 font-mono text-xs bg-slate-900 text-green-400 border-none resize-none p-4 rounded-xl leading-relaxed focus-visible:ring-0"
              />
           </div>
        </div>

      </div>
    </div>
  );
}