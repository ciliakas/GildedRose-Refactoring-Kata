import axios from "axios";

interface DataResponse {
  answer: "yes" | "no" | "maybe";
  forced: boolean;
  image: string;
}

export const main = async () => {
  const updateCount = 10;
  const callCount = 5;
  // Need to take in two arguments
  // Output positive respones to log.txt

  let counts = callCount;
  while (counts !== 0) {
    const time = new Date();
    const positiveResponses = await placeholder(counts);
    console.log(
      `Time of requests: ${time.toISOString()}, number of positive responses: ${
        positiveResponses.length
      }`
    );
    counts = positiveResponses.length;
  }

  // Run update in gilded rose
  // Repeat
  // Need to add logging
  // Need to add reading of arguments
};

const placeholder = async (callCount: number) => {
  let promises: (() => Promise<DataResponse>)[] = [];
  for (let index = 0; index < callCount; index++) {
    promises.push(getData);
  }
  const result = await Promise.all([...promises.map((promise) => promise())]);
  const positiveResponses = result.filter((x) => x.answer === "yes");
  return positiveResponses;
};

const getData = async () => {
  const url = "https://yesno.wtf/api";
  const { data } = await axios.get<DataResponse>(url);
  // Todo some error handling?
  //   console.log(data);
  return data;
};

main();
