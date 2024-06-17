import { SearchPanel } from './SearchPanel';
import { TodoTable } from './Table/TodoTable';

export const TodoWrapper = () => {
  return (
    <div>
      <SearchPanel />
      <TodoTable />
    </div>
  );
};
