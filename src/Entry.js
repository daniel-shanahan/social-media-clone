import UserListItem from "./UserListItem";

export default function Entry({ props }) {
  const { uid, getDetailsFromUID, text } = props;

  return (
    <>
      <UserListItem uid={uid} getDetailsFromUID={getDetailsFromUID} />
      <p className="mt-3 mb-3">{text}</p>
    </>
  );
}