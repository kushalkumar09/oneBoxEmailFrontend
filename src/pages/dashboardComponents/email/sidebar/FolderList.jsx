export const FolderList = ({ folders, selectedFolder, onSelectFolder }) => {
  return (
    <div className="px-3 py-2">
      <h3 className="mb-2 px-3 text-xs font-medium uppercase text-slate-500">Folders</h3>
      <nav className="space-y-1">
        {folders.map((folder) => (
          <button
            key={folder.id}
            className={`flex w-full items-center rounded-md px-3 py-1 text-sm transition ${
              selectedFolder === folder.name
                ? "bg-slate-100 font-medium text-slate-900"
                : "text-slate-600 hover:bg-slate-50"
            }`}
            onClick={() => onSelectFolder(folder.name)}
          >
            <span className="mr-2 text-slate-500">{folder.icon}</span>
            {folder.name}
          </button>
        ))}
      </nav>
    </div>
  );
};
