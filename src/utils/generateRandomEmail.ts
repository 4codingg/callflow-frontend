export function generateRandomEmail() {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const domains = ['gmail', 'yahoo', 'outlook', 'hotmail'];
  const tlds = ['com', 'net', 'org', 'edu'];

  function generateRandomString(length) {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  const username = generateRandomString(8);
  const domain = domains[Math.floor(Math.random() * domains.length)];
  const tld = tlds[Math.floor(Math.random() * tlds.length)];

  return `${username}@${domain}.${tld}`;
}
