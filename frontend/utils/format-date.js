export const formatDate = (date) => {
  if(!date) return
  const time = new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, 
  }).format(new Date(date))
  // const days = new Date(date).toLocaleDateString('pt-BR')
  // return `${days} - ${time}`
  return time
}