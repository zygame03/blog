import { Footer } from "antd/es/layout/layout";

const Z_Footer = () => {
    return (
        <Footer style={{ textAlign: 'center' }}>
          ©{new Date().getFullYear()} zygame | Built with React + Go
        </Footer>
    )
}

export default Z_Footer 