import React from "react";

const ContractsContext = React.createContext({
  appInstance: null,
  appStatus: false,
  dataInstance: null,
});

class ContractsProvider extends React.Component {
  render() {
    const { appInstance, appStatus, dataInstance } = this.props;

    return (
      <ContractsContext.Provider
        value={{
          appInstance: appInstance,
          appStatus: appStatus,
          dataInstance: dataInstance,
        }}
      >
        {this.props.children}
      </ContractsContext.Provider>
    );
  }
}

export { ContractsProvider, ContractsContext };
