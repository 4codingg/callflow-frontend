export function formatMessageToBackEnd(message: string) {
  return message.replace(/\{([^}]+)\}/g, '{{{$1}}}');
}