export const activities = [
  {
    value: "failed",
    label: "Falha",
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
