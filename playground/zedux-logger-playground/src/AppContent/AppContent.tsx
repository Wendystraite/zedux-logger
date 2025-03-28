import { CreateAtomButton } from './CreateAtomButton';
import { GenericAtomList } from './GenericAtomList';
import { SelectAtomType } from './SelectAtomType';

export function AppContent() {
  return (
    <div className="w-screen h-screen flex flex-1 flex-col content-center items-center gap-4">
      <h1 className="text-2xl">Zedux Logger Playground</h1>
      <div className="flex flex-row gap-2 items-center">
        <CreateAtomButton />
        {' of type '}
        <SelectAtomType />
      </div>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 self-stretch p-4">
        <GenericAtomList />
      </ul>
    </div>
  );
}
