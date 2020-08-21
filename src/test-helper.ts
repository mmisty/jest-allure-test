import {dateStr} from "./date-utils";

const allure = reporter;

export const allureT = {
  step(name: string) {
    allure.startStep(dateStr() + '>' + name);
    allure.endStep();
  },
};

export async function delay(ms: number, ...messages: string[]) {
  allure.startStep(dateStr() + '>' + 'delay ' + ms);
  console.log(
    ...messages,
    messages.length > 0 ? ':' : '',
    `DELAY ${ms.toString()} ms`,
  );
  await new Promise((resolve) => setTimeout(resolve, ms));
  allure.endStep();
}
export async function wait(ms: number, condition: () => boolean) {
  allure.startStep(dateStr() + '>' + 'wait ' + ms);

  const start = Date.now();
  let elapsed = Date.now();
  const timeout = 10000;
  while(elapsed - start < timeout){
    elapsed = Date.now();
    if(condition()){
      break;
    }
    await delay(0);
  }
  if(elapsed - start >=timeout){
    allure.endStep();
    throw new Error('Timeout wait');
  }
  allure.endStep();
}
export function log(...messages: string[]) {
  allure.startStep(dateStr() + '>' + messages.join(' '));
  allure.endStep();
}
