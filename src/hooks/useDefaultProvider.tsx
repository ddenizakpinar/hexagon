import { useEffect, useState, FC } from "react";
import { ethers, providers } from "ethers";

const useDefaultProvider = () => {
  const [defaultProvider, setDefaultProvider] = useState<providers.BaseProvider>();

  useEffect(() => {
    getConnection();
  }, []);

  const getConnection = async () => {
    const provider = ethers.providers.getDefaultProvider(
      "// INSERT PROVIDER",
    );

    setDefaultProvider(provider);
  };

  return defaultProvider;
};
export default useDefaultProvider;
