import { Outlet } from 'react-router-dom'

const Layouts = () => {
  return (
    <main>
      <div>navbar</div>
      {<Outlet/>}
      <div>footer</div>
    </main>
    )
}

export default Layouts