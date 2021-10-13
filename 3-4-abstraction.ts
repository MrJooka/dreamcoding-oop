{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }
  class CoffeeMachine implements CoffeeMaker {
    private static BEANS_GRAM_PER_SHOT: number = 7;
    private coffeeBeans: number = 0;

    private constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    static makeMachine(coffeeBeans: number): CoffeeMachine {
      return new CoffeeMachine(coffeeBeans);
    }

    fillCoffeeBeans(beans: number) {
      if (beans < 0) {
        throw new Error('parameter should be greater thhan 0');
      }
      this.coffeeBeans += beans;
    }
    private grindBeans(shots: number) {
      console.log(`grinding beans for ${shots}`);
      if (this.coffeeBeans < shots * CoffeeMachine.BEANS_GRAM_PER_SHOT) {
        throw new Error('Not enoght coffee beans!');
      }
      this.coffeeBeans -= shots * CoffeeMachine.BEANS_GRAM_PER_SHOT;
    }
    private preheat(): void {
      console.log('heating up...🔥🔥🔥');
    }
    private extract(shots: number): CoffeeCup {
      console.log(`Pulling down ${shots}...☕☕☕☕`);
      return {
        shots: shots,
        hasMilk: false,
      };
    }
    makeCoffee(shots: number): CoffeeCup {
      this.grindBeans(shots);
      this.preheat();
      return this.extract(shots);
    }
  }

  const maker: CoffeeMachine = CoffeeMachine.makeMachine(2);
  maker.fillCoffeeBeans(39);
  maker.makeCoffee(2);
  // 커피메이커 인터페이스에는 fillCoffeeBeans 메서드가 존재하지 않는다
  const maker2: CoffeeMaker = CoffeeMachine.makeMachine(2);
  maker2.makeCoffee(0);
}
