import { useEffect, useState } from "react"
import "./App.css"
import { useDebounce, useSyncState, useFetch, useList } from "hooks"

const fn1 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let condition = Math.random() < 0.5
      if (condition) {
        resolve("success")
      } else {
        reject("failed")
      }
    }, 1000)
  })
}
const fn2 = (params: any) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(params)

      if (Math.random() <= 0.7) {
        if (params.name) {
          resolve([
            {
              name: "a",
              age: 1,
            },
            {
              name: "b",
              age: 2,
            },
          ])
        } else {
          resolve([
            {
              name: "c",
              age: 3,
            },
            {
              name: "d",
              age: 4,
            },
          ])
        }
      } else {
        reject("failed")
      }
    }, 1000)
  })
}

function App() {
  const [count1, setCount1] = useDebounce(0, 500)
  const [count2, setCount2] = useSyncState(0)
  // const { data, error, isLoading, fetch } = useFetch(fn1, {
  //   isManual: true,
  // });

  const { config, fetch, reset, setField } = useList(fn2, {
    initialSearchParams: {
      name: "",
    },
  })

  useEffect(() => {
    setCount2(count2.current + 1)
  }, [count1])

  return (
    <div className="App">
      <div className="card">
        <button onClick={() => setCount1((count1) => count1 + 1)}>
          count:{count1}
        </button>
      </div>
      {/* <hr /> */}
      {/* <div>
        <button onClick={() => fetch()}>再次请求！</button>
        {isLoading ? (
          <div>正在请求中</div>
        ) : error ? (
          <div>请求出错:{error}</div>
        ) : data ? (
          <div>请求成功:{data}</div>
        ) : (
          <div>开始你的请求吧！</div>
        )}
      </div> */}
      <hr />
      <div>
        <div>
          <input
            type="text"
            value={config.searchParams?.name}
            onChange={(e) => setField("name", e.target.value)}
          />
        </div>

        <button className="primary" onClick={() => fetch()}>
          查询
        </button>
        <button onClick={() => reset()}>清空</button>
        {config.isLoading ? (
          <div>正在请求中</div>
        ) : config.error ? (
          <div>请求出错:{config.error}</div>
        ) : config.data ? (
          <div>
            请求成功:
            {config.data.map((i, index) => (
              <ul key={index}>
                <li>{i.name}</li>
                <li>{i.age}</li>
              </ul>
            ))}
          </div>
        ) : (
          <div>开始你的请求吧！</div>
        )}
      </div>
    </div>
  )
}

export default App
