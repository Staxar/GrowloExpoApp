import { StyleSheet, Text } from "react-native";
import React, { useContext, useState } from "react";
import { Colors, Typography } from "../../constans/styles";
import { Pressable } from "react-native";
import { AuthContext } from "../../store/auth-context";
import { setFavorites } from "../../util/uploadProduct";
import Ionicons from "@expo/vector-icons/Ionicons";
export default function AddCustomButton({ onPress, isFavorite, productId }) {
  const [favorite, setFavorite] = useState(isFavorite);
  const [favoriteKey, setFavoriteKey] = useState(isFavorite);
  const authCtx = useContext(AuthContext);

  function manageFavoritesHandler() {
    setFavorites(productId, authCtx.uid, favorite, favoriteKey).then((res) => {
      setFavoriteKey(res);
    });
    setFavorite(!favorite);
    return;
  }
  return (
    <Pressable style={styles.container} onPress={manageFavoritesHandler}>
      {favorite ? (
        <Ionicons
          name="heart-dislike-outline"
          size={18}
          color={Colors.error800}
        />
      ) : (
        <Ionicons name="heart-outline" size={18} color={Colors.primary100} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: Colors.primary100,
    padding: 1,
  },
});
