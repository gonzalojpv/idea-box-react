import BaseButton from "@/components/BaseButton";
import BaseContainer from "@/components/BaseContainer";
import BaseCard from "@/components/BaseCard";
import BaseIconButton from "@/components/BaseIconButton";
import BaseList from "@/components/BaseList";
import BaseInputRef from "@/components/BaseInputRef";
import BaseInput from "@/components/BaseInput";
import BaseForm, { type FormHandle } from "@/components/BaseForm";

import { useRef } from "react";

function HeartIcon() {
  return <span>❤️</span>;
}

const TestCourse = () => {
  const input = useRef<HTMLInputElement>(null);
  const customForm = useRef<FormHandle>(null);

  const users = [
    { id: "u1", name: "Max" },
    { id: "u2", name: "Manuel" },
  ];

  const hobbies = ["Sports", "Reading", "Cooking"];

  const handleSave = (data: unknown) => {
    const extractedData = data as { name: string; age: string };

    // if (!data || typeof data !== "object" || !("name" in data) || !("age" in data)) {
    //   return;
    // }

    // at this point, TypeScript knows that data MUST BE an object
    // with a name and age property
    // otherwise, the previous if statement would have returned
    console.log("Data", extractedData);
    customForm.current?.clear();
  };

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

      <BaseInputRef label="Test" id="test" name="test" ref={input} />
      <BaseInput label="Test2" id="test2" name="test" />

      <BaseForm onSave={handleSave} ref={customForm}>
        <BaseInputRef type="text" label="Name" id="name" name="name" />
        <BaseInputRef type="number" label="Age" id="age" name="age" />
        <BaseButton>Save</BaseButton>
      </BaseForm>
    </main>
  );
};

export default TestCourse;
