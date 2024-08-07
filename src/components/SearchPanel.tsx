import type { SearchPanelProps } from '@/types/searchPanelProps';
import type { SelectedArrangementType } from '@/types/selectedArrangementType';

export const SearchPanel: React.FC<SearchPanelProps> = (props) => {
  const getSelectedUserId = (todoUserId: number) => {
    if (todoUserId === props.searchItems.selectedUserId) {
      props.searchItems.setSelectedUserId(0);
      return;
    }

    props.searchItems.setSelectedUserId(todoUserId);
  };

  const handleSelectedStatus = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    props.searchItems.setSelectedStatus(event.target.value);
  };

  const handleSearchConditionCharacter = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    props.searchItems.setSearchConditionCharacter(event.target.value);
  };

  const handleSelectedArrangementType = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const value = event.target.value as SelectedArrangementType;
    props.searchItems.setSelectedArragementType(value);
  };

  return (
    <div className='space-y-3 mb-6 bg-neutral-100 py-4 px-5 rounded-md'>
      <div>
        <label className='flex flex-col max-w-[300px]'>
          <span className='text-sm'>検索ボックス</span>
          <input
            className='border-[2px] border-neutral-300 rounded-md px-1'
            type='text'
            value={props.searchItems.searchConditionCharacter}
            onChange={handleSearchConditionCharacter}
          />
        </label>
      </div>
      <div className='flex gap-4 mb-4'>
        {props.todoUserIdList.map((todoUserId) => {
          return (
            <button
              onClick={() => getSelectedUserId(todoUserId)}
              className={`w-full bg-sky-600 text-white rounded-md duration-200 ${
                todoUserId === props.searchItems.selectedUserId
                  ? ' opacity-25'
                  : 'opacity-100'
              }`}
              key={todoUserId}
            >
              {todoUserId}
            </button>
          );
        })}
      </div>
      <div>
        <label className='flex flex-col max-w-[300px]' htmlFor=''>
          <span className='text-sm tracking-[-0.08em]'>ステータス</span>
          <select
            value={props.searchItems.selectedStatus}
            onChange={handleSelectedStatus}
            className='border-[2px] border-neutral-300 rounded-md p-1'
            name=''
            id=''
          >
            <option className='notSelected' value='notSelected'>
              選択してください
            </option>
            <option value='completed'>完了</option>
            <option value='incomplete'>未完了</option>
          </select>
        </label>
      </div>
      <div>
        <label className='flex flex-col max-w-[300px]' htmlFor=''>
          <span className='text-sm tracking-[-0.08em]'>並び替え</span>
          <select
            value={props.searchItems.selectedArrangementType}
            onChange={handleSelectedArrangementType}
            className='border-[2px] border-neutral-300 rounded-md p-1'
            name=''
            id=''
          >
            <option value='ascending_order'>昇順</option>
            <option value='descending_order'>降順</option>
          </select>
        </label>
      </div>
    </div>
  );
};
