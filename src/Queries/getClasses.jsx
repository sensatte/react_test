async function getClasses() {
  const response = await fetch(
    "https://bestcycling-public.s3.eu-west-1.amazonaws.com/api-test/db.json",
    {
      method: "GET",
    }
  ).then((data) => {
    return data.json();
  });
  return response.training_classes;
}

export default getClasses;
