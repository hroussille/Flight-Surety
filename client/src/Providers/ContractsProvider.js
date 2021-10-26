import React from "react";

const ContractsContext = React.createContext({
  appInstance: null,
  appStatus: null,
  dataInstance: null,
  dataStatus: null,
});

class ContractsProvider extends React.Component {
  render() {
    const { appInstance, appStatus, dataInstance, dataStatus } = this.props;

    return (
      <ContractsContext.Provider
        value={{
          appInstance: appInstance,
          appStatus: appStatus,
          dataInstance: dataInstance,
          dataStatus: dataStatus,
        }}
      >
        {this.props.children}
      </ContractsContext.Provider>
    );
  }
}

export { ContractsProvider, ContractsContext };
