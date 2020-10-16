import { GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'
import { siteTitle } from '../../components/sugar.config'
import THESUGARME from '../../components/ThesugarMe'
import { Line } from 'react-chartjs-2'

type Data = {
  Country: string
  CountryCode: string
  Lat: string
  Lon: string
  Cases: number
  Status: string
  Date: string
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const country = params?.country

  try {
    const res = await fetch(
      `https://api.covid19api.com/dayone/country/${country}/status/confirmed/live`
    )
    const json: Data[] = await res.json()
    const now = new Date().toLocaleTimeString()

    if (res.status !== 200) {
      console.error(json)
      throw new Error('Failed to fetch API')
    } else if (res.status === 200) {
      const resultArray = []
      for (let element of json) {
        resultArray.push({ date: element.Date, cases: element.Cases })
      }

      return {
        props: {
          country: json[0].Country,
          status: 'ok',
          result: resultArray,
          now
        },
        revalidate: 60,
      }
    }
  } catch (e) {
    console.log(e)

    return {
      props: {
        country,
        status: 'fail',
        result: [],
      },
    }
  }

  // この return を書かないと TypeScript のコンパイラから、返り値の型が GetStaticProps で規定されている型と合わないと怒られる（try catch の影響）
  // 一方、finally を使ってその中で return をすると正常系でも finally からの返り値が返ってしまう
  // 結論：以下の return は意味ない（実行されない）がコンパイラのエラーを抑制するためのもの
  // もしくは、`: GetStaticProps` という型注釈を削除してしまうか
  return {
    props: {
      country: null,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { country: 'japan' } }], // ['/covid/japan'] としてもいい。
    fallback: true,
  }
}

const data = (country: string, date: string[], cases: number[]) => {
  return {
    labels: date,
    datasets: [
      {
        type: 'line',
        label: country,
        fill: true,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'round',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'square',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#eee',
        pointBorderWidth: 1,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 1,
        pointRadius: 1,
        pointHitRadius: 10,
        data: cases,
      },
    ],
  }
}

const chartOption = (country: string) => {
  return {
    title: {
      display: true,
      text: country,
    },
    tooltips: {
      mode: 'label',
    },
    responsive: false,
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          stacked: true,
        },
      ],
      yAxes: [
        {
          stacked: true,
          scaleLabel: {
            display: true,
            labelString: '人',
          },
        },
      ],
    },
  }
}

const Page = (props: {
  country: string
  status: 'ok' | 'fail'
  result: [{ date: string; cases: number }]
  now: string
}) => {
  return (
    <div className="allContainer">
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <header className="header">{THESUGARME}</header>

      <main>
        <h3>
          {props.country}
          {props.status === 'ok' && ' の感染者推移'}
          {props.status === 'fail' && ' のデータは取得できませんでした。'}
        </h3>
        <br />
        {props.status === 'ok' && (
          <Line
            data={data(
              props.country,
              props.result.map((eachData) => eachData.date.slice(0, 10)),
              props.result.map((eachData) => eachData.cases)
            )}
            width={600}
            height={400}
            options={chartOption(props.country)}
          />
        )}
        <br />
        <small>
        最終更新:
        {props.now}
        </small>
      </main>
      <style jsx>{`
        main {
          display: grid;
          max-width: 50vw;
          justify-content: center;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        ul {
          list-style: none;
        }
      `}</style>
    </div>
  )
}

export default Page
