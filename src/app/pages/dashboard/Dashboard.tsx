import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { useUsuarioLogado } from "../../shared/hooks";
import { ApiException } from "../../shared/services/api/ApiException";
import { ITask, TasksService } from "../../shared/services/api/tasks/TasksService";

export const Dashboard = () => {
  const counterRef = useRef({ counter: 0 });

  const { userName, logout } = useUsuarioLogado();

  const [list, setList] = useState<ITask[]>([]);

  useEffect(() => {
    TasksService.getAll().then((result) => {
      if (result instanceof ApiException) {
        alert(result.message);
      } else {
        setList(result);
      }
    });
  }, []);

  const handleInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      if (e.key === "Enter" && e.currentTarget.value.trim()) {
        const valueInput = e.currentTarget.value.trim();

        e.currentTarget.value = "";

        if (list.some((listItem) => listItem.title === valueInput)) return;

        TasksService.create({ title: valueInput, isCompleted: false }).then((result) => {
          if (result instanceof ApiException) {
            alert(result.message);
          } else {
            setList((oldList) => [...oldList, result]);
          }
        });
      }
    },
    [list]
  );

  const handleToggleCompleted = useCallback(
    (id: number) => {
      const taskUpdate = list.find((task) => task.id === id);

      if (taskUpdate === undefined) return;

      TasksService.updateById(id, {
        ...taskUpdate,
        isCompleted: !taskUpdate.isCompleted,
      }).then((result) => {
        if (result instanceof ApiException) {
          alert(result.message);
        } else {
          setList((oldList) => {
            return oldList.map((oldListItem) => {
              if (oldListItem.id === id) return result;
              return oldListItem;
            });
          });
        }
      });
    },
    [list]
  );

  const handleDelete = useCallback((id: number) => {
    TasksService.deleteById(id).then((result) => {
      if (result instanceof ApiException) {
        alert(result.message);
      } else {
        setList((oldList) => {
          return oldList.filter((oldListItem) => oldListItem.id !== id);
        });
      }
    });
  }, []);

  return (
    <div>
      <Link to="/login">Login</Link>
      <p>Dashboard</p>
      <p>{userName}</p>
      <p>Contador: {counterRef.current.counter}</p>
      <button onClick={() => counterRef.current.counter++}>Add</button>
      <button onClick={() => console.log(counterRef.current.counter)}>Log</button>
      <button onClick={logout}>Logout</button>
      <br />
      <input type="text" onKeyDown={handleInputKeyDown} />
      <p>Items checados: {list.filter((listItem) => listItem.isCompleted).length}</p>
      <ul>
        {list.map((listItem) => (
          <li key={listItem.id}>
            <input
              type="checkbox"
              checked={listItem.isCompleted}
              onChange={() => handleToggleCompleted(listItem.id)}
            />
            {listItem.title}
            <button onClick={() => handleDelete(listItem.id)}>Apagar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
