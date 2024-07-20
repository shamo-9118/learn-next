import type { SelectedArrangementType } from '@/types/selectedArrangementType';

export type SearchItems = {
  selectedUserId: number;
  setSelectedUserId: React.Dispatch<React.SetStateAction<number>>;
  selectedStatus: string;
  setSelectedStatus: React.Dispatch<React.SetStateAction<string>>;
  searchConditionCharacter: string;
  setSearchConditionCharacter: React.Dispatch<React.SetStateAction<string>>;
  selectedArrangementType: SelectedArrangementType;
  setSelectedArragementType: React.Dispatch<
    React.SetStateAction<SelectedArrangementType>
  >;
};
