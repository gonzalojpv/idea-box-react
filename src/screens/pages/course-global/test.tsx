import BaseButton from "@/components/BaseButton";
import BaseContainer from "@/components/BaseContainer";

const TestCourse = () => {
  return (
    <main>
      <BaseContainer as={BaseButton} type="button">
        Click me
      </BaseContainer>
    </main>
  );
};

export default TestCourse;
