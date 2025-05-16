// Funções utilitárias compartilhadas
// Implemente aqui utils reutilizáveis e use nos apps

// Exemplo de função utilitária para manipulação de datas
export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};
