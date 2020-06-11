export interface iTicket {
    // Цена в рублях
    price: number
    // Код авиакомпании (iata)
    carrier: string
    // Массив перелётов.
    // В тестовом задании это всегда поиск "туда-обратно" значит состоит из двух элементов
    segments: [
      {
        // Код города (iata)
        origin: string
        // Код города (iata)
        destination: string
        // Дата и время вылета туда
        date: string
        // Массив кодов (iata) городов с пересадками
        stops: string[]
        // Общее время перелёта в минутах
        duration: number
      },
      {
        // Код города (iata)
        origin: string
        // Код города (iata)
        destination: string
        // Дата и время вылета обратно
        date: string
        // Массив кодов (iata) городов с пересадками
        stops: string[]
        // Общее время перелёта в минутах
        duration: number
      }
    ]
  }

export type tTickets = iTicket[];

class AviaSales {
    private baseUrl: string = "https://front-test.beta.aviasales.ru"

    public getSearchId = async() => {
        const response = await fetch(this.baseUrl + "/search");
        const parsed = await response.json();

        return parsed.searchId as string;
    }

    public searchTickets = async(searchId: string) => {
        const response = await fetch(this.baseUrl + "/tickets?searchId=" + searchId);
        const parsed = await response.json() as { stop: boolean, tickets: tTickets };

        return parsed;
    }
}

export const aviaSales = new AviaSales();