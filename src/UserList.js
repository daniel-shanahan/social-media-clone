import UserListItem from "./UserListItem";

export default function UserList({ props }) {
  const { uids, getDetailsFromUID } = props;

  return (
    <div className="content-item flex flex-col gap-2 sm:gap-4">
      {uids.length !== 0 
        ? uids.map(uid => <UserListItem key={uid} uid={uid} getDetailsFromUID={getDetailsFromUID} /> )
        : <p className="text-center">There is nobody here.</p>}
    </div>
  );
};