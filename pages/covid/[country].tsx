import { GetStaticProps, GetStaticPaths } from 'next'

type Data = {
  Country: string
  CountryCode: string
  Lat: string
  Lon: string
  Cases: number
  Status: string
  Date: string
}

export const getStaticProps: GetStaticProps = async (context) => {

  const country = context.params?.country

  try {
  const res = await fetch (`https://api.covid19api.com/dayone/country/${country}/status/confirmed/live`)
  const json : Data[] = await res.json()

  if (res.status !== 200) {
    console.error(json)
    throw new Error('Failed to fetch API')
  }

  const result =
  {
    country: json[0].Country,
    data : json.map(element => {date: element.Date
                                cases: element.Cases
                              })
  }

  return {
    props: {
      json
    },
    revalidate: 30,
  }

  } catch (e) {
    console.log("きゃーーーーーーーーーっち")
    console.log(e)
    return {
      props: {
        json: null
      }
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { country: 'japan' } }], // ['/covid/japan'] としてもいい。
    fallback: true,
  }
}

const Page = (props: { json : Data[] }) => {
  return (
    <>
    <h2 className="pageTitle">
      {props.json && props.json[0].Country} の 感染者推移
    </h2>
    {props.json && props.json.map(elm =>
    <ul key={elm.Date}>
      <li className="date">{elm.Date.slice(0,10)}</li>
      <li className="cases">{elm.Cases}</li>
    </ul>  
    )}
    </>
  )
}

export default Page

// import { GetStaticProps, GetStaticPaths } from 'next'

// type Data = {
//   Country: string
//   CountryCode: string
//   Lat: string
//   Lon: string
//   Cases: number
//   Status: string
//   Date: string
// }

// export const getStaticProps: GetStaticProps = async (context) => {

//   const country = context.params?.country

//   try {
//   const res = await fetch (`https://api.covid19api.com/dayone/country/${country}/status/confirmed/live`)
//   const json : Data[] = await res.json()

//   if (res.status !== 200) {
//     console.error(json)
//     throw new Error('Failed to fetch API')
//   }

//   const resultMap = new Map()
//   json.map(elm => {
//     resultMap.set(elm.Date, elm.Cases)
//   })

//   const result =
//   {
//     country: json[0].Country,
//     status: 'ok',
//     data : JSON.parse(JSON.stringify(resultMap)),
//   }

//   return {
//     props: {
//       result
//     },
//     revalidate: 30,
//   }

//   } catch (e) {
//     console.log(e)
//     const result = {
//       country,
//       status: 'fail',
//       data : {
//         date: null,
//         cases: null
//       }
//     }
//     return {
//       props: {
//         result
//       }
//     }
//   }
// }

// export const getStaticPaths: GetStaticPaths = async () => {
//   return {
//     paths: [{ params: { country: 'japan' } }], // ['/covid/japan'] としてもいい。
//     fallback: true,
//   }
// }

// type Result = {
//   country: string
//   status: 'ok' | 'fail'
//   data: Map<string, number>
// }

// const Page = (result : Result) => {

//   console.log(result)

//   const correct =
//     <h2 className="pageTitle">
//     {result.country } の 感染者推移
//     </h2>
    
//     {result.data && result.data.forEach((value, key) =>
//     <ul key={key}>
//     <li className="date">{key}</li>
//     <li className="cases">{value}</li>
//     </ul>
//     )}

//   const error = 
//       <h2>
//         {result.country} のデータは見つけられませんでした。
//       </h2>

//     return (
//       <>
//       {result.status === 'ok' ? correct : error}
//       </>
//     )
// }

// export default Page