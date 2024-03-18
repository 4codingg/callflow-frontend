export const activities = [
  {
    value: 'completed',
    label: 'Finalizada'
  },
  {
    value: 'pending',
    label: 'Pendente'
  },
  {
    value: 'paid',
    label: 'Paga'
  },
]

export const getActivitieLabel = (value: string) => {
  const activitie = activities.find((a) => a.value === value)
  return activitie.label
}