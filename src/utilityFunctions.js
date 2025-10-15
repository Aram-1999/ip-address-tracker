export function isIP(str) {
  // IPv4 regex
  const ipv4Regex =
    /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;
  // IPv6 regex (simple version)
  const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;

  if (ipv4Regex.test(str)) {
    return true;
  }
  if (ipv6Regex.test(str)) {
    return true;
  }

  return false;
}

export function isDomain(str) {
  const domainRegex = /^(?!:\/\/)([a-zA-Z0-9-_]+\.)+[a-zA-Z]{2,}$/;
  return domainRegex.test(str);
}