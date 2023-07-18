// eslint-disable-next-line no-unused-vars
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  // eslint-disable-next-line no-unused-vars
  const [todoName, setTodoName] = useState("");
  const [bottomBorder] = useState(' h-inherit border-b-2 border-indigo-600')
  const [allBorder, setAllBorder] = useState(bottomBorder);
  const [activeBorder, setActiveBorder] = useState("");
  const [completeBorder, setCompleteBorder] = useState("");
  const [allList, setAllList] = useState(null);
  const [active, setActive] = useState(null);
  const [all, setAll] = useState(null);
  const [completed, setCompleted] = useState(null);
  const [none, setNone] = useState("");
  const [none2, setNone2] = useState("hidden");
  const [butStyle] = useState('outline-none border-t-0 border-l-0 border-r-0 bg-white text-black pb-2 px-5')
  

  useEffect(() => {
    const existingTodo = JSON.parse(localStorage.getItem("data")) || [];
    const filteredData = existingTodo.filter(item => item.todoTitle !== "");
    const active = filteredData?.filter((item) => item.checked === false);
    const completed = filteredData?.filter((item) => item.checked === true);
    setAllList(filteredData);
    setAll(filteredData);
    setActive(active);
    setCompleted(completed);
  }, []);
  const handleCheckboxChange = (index) => {
    const updatedList = [...allList]; 
  
    const newData = updatedList[index].checked = !updatedList[index].checked; 
    setAllList(newData);
    console.log(newData)
    localStorage.setItem('data', JSON.stringify(updatedList));
    window.location.reload();

  };
  const handleDelete = () => {
    const existingTodo = JSON.parse(localStorage.getItem("data")) || [];
    const filteredData = existingTodo.filter(item => item.todoTitle !== "");
    const filteredDataChecked = filteredData.filter(item => !item.checked);
    localStorage.setItem('data', JSON.stringify(filteredDataChecked));
    window.location.reload();

  }

  const allTodoList = (
    <div className="flex justify-center items-start gap-5 flex-col">
      {allList?.map((datas, index) => (
        <div key={datas?.todoTitle} className="flex flex-row-reverse gap-1">
          {datas.checked ? (
            <>
              <div className="line-through">{datas.todoTitle}</div>
              <input type="checkbox" checked 
              onChange={() => handleCheckboxChange(index)} />

              <button onClick={handleDelete} className={none2 + ' ' + 'bg-red-700 px-4 py-2 absolute bottom-0 right-0'}>Delete All</button>
            </>
          ) : (
            <>
              <div>{datas.todoTitle}</div>
              <input type="checkbox" 
              onChange={() => handleCheckboxChange(index)} />
            </>
          )}
        </div>
      ))}
    </div>
  );

  const handleAll = (e) => {
    e.preventDefault;
    setAllBorder(bottomBorder);
    setActiveBorder("");
    setCompleteBorder("");
    setAllList(all);
    setNone("");
    setNone2('hidden');

  };
  const handleActive = (e) => {
    e.preventDefault;
    setActiveBorder(bottomBorder);
    setAllBorder("");
    setCompleteBorder("");
    setAllList(active);
    setNone("");
    setNone2('hidden');
  };

  const handleComplete = (e) => {
    e.preventDefault;
    setCompleteBorder(bottomBorder);
    setAllBorder("");
    setActiveBorder("");
    setAllList(completed);
    setNone("hidden");
    setNone2('');

  };

  const handleAdd = () => {
    const existingTodo = JSON.parse(localStorage.getItem("data")) || [];
    const newTodo = {
      todoTitle: todoName,
      checked: false,
    };

    existingTodo.push(newTodo);
    localStorage.setItem("data", JSON.stringify(existingTodo));
    window.location.reload();
  };
  return (
    <div className="mt-5 flex justify-center items-start flex-wrap w-100">
      <div className=" sm:w-4/5 md:w-3/5 lg:w-2.5/5 xl:w-2/5 mx-auto">
        <div>
          <h1 className="text-2xl font-bold text-center">Fow Org Todo App</h1>
        </div>

        <div className="mt-8 mb-8">
          <div className="flex flex-row justify-between items-center">
            <button className={butStyle + " " + allBorder} onClick={handleAll}>
              All
            </button>
            <button
              className={butStyle + " " + activeBorder}
              onClick={handleActive}
            >
              Active
            </button>
            <button
              className={butStyle + " " + completeBorder}
              onClick={handleComplete}
            >
              Completed
            </button>
          </div>
        </div>

        <div className={"details" + " " + none}>
          <div className="flex flex-row gap-5">
            <input
              type="text"
              placeholder="Add details"
              value={todoName}
              onChange={(e) => setTodoName(e.target.value)}
              className="h-10 rounded-lg text-black text-sm outline-none border-gray-300 border-2 flex-grow pl-2"
            />
            <button onClick={handleAdd} type="submit" className="bg-blue-500 h-70 rounded-lg outline-none text-white border-none px-3 py-2">
              ADD
            </button>
          </div>
        </div>

        <div className="mt-7 pb-8 relative">{allTodoList}</div>
      </div>
    </div>
  );
}

export default App;
