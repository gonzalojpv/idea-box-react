import BaseButton from "@/components/BaseButton";
import BaseContainer from "@/components/BaseContainer";
import BaseCard from "@/components/BaseCard";
import BaseIconButton from "@/components/BaseIconButton";
import BaseList from "@/components/BaseList";

function HeartIcon() {
  return <span>❤️</span>;
}

const TestCourse = () => {
  const users = [
    { id: "u1", name: "Max" },
    { id: "u2", name: "Manuel" },
  ];

  const hobbies = ["Sports", "Reading", "Cooking"];
  return (
    <main className="p-2 bg-gray-500">
      <BaseContainer as={BaseButton} type="button">
        Click me
      </BaseContainer>
      <BaseIconButton icon={HeartIcon} onClick={() => console.log("Button clicked!")}>
        Like
      </BaseIconButton>
      <BaseCard
        title="My Card"
        actions={<button onClick={() => console.log("Button clicked!")}>Click Me!</button>}
      >
        <p>Some content</p>
      </BaseCard>

      <section className="mt-4 bg-red-500 p-4">
        <h2>Users</h2>
        <BaseList items={users} renderItem={user => <li key={user.id}>{user.name}</li>} />
      </section>
      <section className="mt-4 bg-yellow-500 p-4">
        <h2>Hobbies</h2>
        <BaseList items={hobbies} renderItem={hobby => <li key={hobby}>{hobby}</li>} />
      </section>
    </main>
  );
};

export default TestCourse;
