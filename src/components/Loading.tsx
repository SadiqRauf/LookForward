import React from "react";
import { ActivityIndicator, Modal, View } from "react-native";

const Loading = (props) => {
    return (
        <>
            <Modal
                animationType="fade"
                transparent={true}
                visible={props.modalVisible}
                onRequestClose={() => {

                }}
            >
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "#00000090" }}>
                    <View>
                        <ActivityIndicator size="large" color={'#fff'} />
                    </View>
                </View>
            </Modal>
        </>
    )
}

export default Loading;