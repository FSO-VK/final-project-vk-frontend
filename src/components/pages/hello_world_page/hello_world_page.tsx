import Col from "../../layouts/col/col";
import TopBottomLayout from "../../layouts/top_bottom_layout/top_bottom_layout";

function HelloWorldPage() {
    return (
        <>
            <TopBottomLayout>
                <Col size={4} >
                    <h1>final-project-vk-frontend</h1>
                </Col>
                <div>
                    <p>Hello, World!</p>
                </div>
            </TopBottomLayout >
        </>
    )
}

export default HelloWorldPage;
