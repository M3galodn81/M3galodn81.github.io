export const switchDefaultConfig = `enable
configure terminal
no ip domain-lookup`;

export const switchEndConfig = `end
write memory`;

export const generateBannerConfig = (bannerMessage: string) => {
  return `banner motd #${bannerMessage}#`;
};

export const generateHostnameConfig = (hostname: string) => {
  return `hostname ${hostname}`;
};

export const generateEnableSecretConfig = (password: string) => {
  return `enable secret ${password}`;
};

export const generateConsolePasswordConfig = (password: string) => {
  return `line console 0
 password ${password}
 login
 exit`;
};

export const generateGlobalSecurityConfig = (enableDhcpSnooping: boolean, enableDai: boolean, vlanIds: number[]) => {
  let config = "";
  if (vlanIds.length === 0) return config;
  
  const vlanRange = vlanIds.join(',');

  if (enableDhcpSnooping) {
    config += `! --- Global DHCP Snooping ---\nip dhcp snooping\nip dhcp snooping vlan ${vlanRange}\n`;
  }
  
  if (enableDai) {
    config += `! --- Dynamic ARP Inspection ---\nip arp inspection vlan ${vlanRange}\n`;
  }
  
  return config;
};

export const generateVLANConfig = (vlanId: number, vlanName: string) => {
  return `vlan ${vlanId}
 name ${vlanName}
 exit`;
};

export const generateInterfaceConfig = (
  interfaceName: string, 
  vlanId: number, 
  description?: string,
  dhcpTrust?: boolean,
  arpTrust?: boolean
) => {
  let config = `interface ${interfaceName}\n`;
  if (description) config += ` description ${description}\n`;
  
  config += ` switchport mode access
 switchport access vlan ${vlanId}\n`;

  if (dhcpTrust) config += ` ip dhcp snooping trust\n`;
  if (arpTrust) config += ` ip arp inspection trust\n`;

  config += ` no shutdown
 exit`;
  return config;
};

export const generateTrunkInterfaceConfig = (
  interfaceName: string, 
  allowedVlans: string,
  description?: string,
  dhcpTrust?: boolean,
  arpTrust?: boolean
) => {
  let config = `interface ${interfaceName}\n`;
  if (description) config += ` description ${description}\n`;

  config += ` switchport mode trunk
 switchport trunk allowed vlan ${allowedVlans}\n`;

  if (dhcpTrust) config += ` ip dhcp snooping trust\n`;
  if (arpTrust) config += ` ip arp inspection trust\n`;

  config += ` no shutdown
 exit`;
  return config;
};

export const generatePortSecurityConfig = (interfaceName: string, maxMacs: number, violation: string) => {
  return `interface ${interfaceName}
 switchport port-security
 switchport port-security maximum ${maxMacs}
 switchport port-security violation ${violation}
 switchport port-security aging time 2
 switchport port-security aging type inactivity
 exit`;
};

export const generateVLANInterfaceConfig = (vlanId: number, ipAddress: string, subnetMask: string) => {
  return `interface vlan ${vlanId}
 ip address ${ipAddress} ${subnetMask}
 no shutdown
 exit`;
};

export const generateDefaultGatewayConfig = (gatewayIp: string) => {
  return `ip default-gateway ${gatewayIp}`;
};

export const generateSSHConfig = (domainName: string, username: string, password: string) => {
  return `ip domain-name ${domainName}
crypto key generate rsa modulus 1024
username ${username} privilege 15 secret ${password}
line vty 0 4
 transport input ssh
 login local
 exit`;
};

export const generateNTPConfig = (ntpServerIp: string) => {
  return `ntp server ${ntpServerIp}`;
};

export const generateSNMPConfig = (communityString: string) => {
  return `snmp-server community ${communityString} RO`;
};

export const generateLoggingConfig = (loggingServerIp: string) => {
  return `logging host ${loggingServerIp}
logging trap informational`;
};