// The goal - allow  only logged in users to write comments and set upvotes. So our components should know about
// wheter user is logged in or not

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

const useUser = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // user( that we use as parametr in callback) can be firebase object or null.
  // if user is firebase object, that means user is logged in, if it is null - user isn`t logged in
  // and our different components will be able to look at
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), user => {
      setUser(user);
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  return { user, isLoading };
};

export default useUser;
