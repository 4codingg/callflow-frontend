export const activities = [
  {
    value: "CONFIRMED",
    label: "Finalizada",
  },
  {
    value: "completed",
    label: "Finalizada",
  },
  {
    value: "pending",
    label: "Pendente",
  },
];

export const getActivitieLabel = (value: string) => {
  const activitie = activities.find((a) => a.value === value);
  return activitie.label;
};
