export async function sendEmail(data: FormData) {
  const apiEndpoint = '/api/email';
  const res = await fetch(apiEndpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((response) => {
      return true;
    })
    .catch((err) => {
      return false;
    });

  return res;
}

export type FormData = {
  type: any;
  email: string;
  message: string;
};
