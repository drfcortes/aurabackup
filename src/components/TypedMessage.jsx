import { ReactTyped } from "react-typed";

export default function TypedMessage() {
    return (
        <ReactTyped
            strings={[
                "ChatGPT, please use this Aura block to generate the content response based on the prompt field."
            ]}
            typeSpeed={45}
            backSpeed={25}
            loop
        />
    );
}
