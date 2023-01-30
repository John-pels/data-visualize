import React, { useCallback, useState } from "react";
import { Checkbox } from "./components/Checkbox";
import { SelectBox } from "./components/SelectBox";
import { useFetchPort, useFetchRates } from "./hooks";



const CHECKBOXES = [
  { name: 'high', value: 'high', label: 'Market High' },
  { name: 'mid-high', value: 'mid-high', label: 'Market Mid-High' },
  { name: 'average', value: 'average', label: 'Market Average' },
  { name: 'mid-low', value: 'mid-low', label: 'Market Mid-Low' },
  { name: 'low', value: 'low', label: 'Market Low' },
]

function App() {
  const [marketPosition, setmarketPosition] = useState('high')
  const [port, setPort] = useState({
    origin: 'CNSGH',
    destination: 'NOOSL'
  })
  const [allPorts] = useFetchPort()
  const [allRates, , loading] = useFetchRates(port)
  console.log('ports', allPorts)
  console.log('rates', allRates)
  const handleMarketPosition = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target
    if (checked) {
      console.log(value)
      setmarketPosition(value)
    }
  }, [])

  const handlePortChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target
    setPort({
      ...port,
      [name]: value
    })
    console.log(port)
  }, [port])


  return (
    <div className="container">
      <form className="search-form flex">
        <SelectBox
          onChange={handlePortChange}
          name='origin'
          value={port.origin}
          options={allPorts}
        />
        <span>X</span>
        <SelectBox
          onChange={handlePortChange}
          name='destination'
          value={port.destination}
          options={allPorts}
        />
      </form>
      <main className="content flex">
        <section className="chart">
          {loading ? <p>Loading...</p> : null}
        </section>
        <section className="position">
          <h4>Market Position</h4>
          <div className="flex position_checkbox">
            {
              React.Children.toArray(CHECKBOXES.map(({ name, label, value }) => (
                <Checkbox
                  label={label}
                  name={name}
                  value={value}
                  checked={marketPosition === value}
                  onChange={handleMarketPosition}
                />
              )))
            }
          </div>

        </section>
      </main>
    </div>
  );
}
export default App;
