<script setup lang="ts">
const catchTheKonami = () => {
  const pattern = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ];
  let current = 0;

  const onKeydown = function (event: any) {
    if (pattern.indexOf(event.key) < 0 || event.key !== pattern[current]) {
      current = 0;
      return;
    }

    current++;

    if (pattern.length === current) {
      current = 0;
      window.alert("You found it!");
    }
  };

  document.addEventListener("keydown", onKeydown, false);
};

if (document) {
  console.log(`
░▀█▀░░░█▀▄░█▀█░█▀█░▀░▀█▀░░░█░█░█▀█░█▀█░█░█░░░░░
░░█░░░░█░█░█░█░█░█░░░░█░░░░█▀▄░█░█░█░█░█▄█░░░░░
░▀▀▀░░░▀▀░░▀▀▀░▀░▀░░░░▀░░░░▀░▀░▀░▀░▀▀▀░▀░▀░▀░░░

░▀█▀░▀░█▄█░░░█▄█░█▀█░█░█░▀█▀░█▀█░█▀▀░░░▀█▀░█░█░▀█▀░█▀▀░░░█░█░█▀█░░░█▀█░█▀▀░░░▀█▀░░░█▀▀░█▀█░░░
░░█░░░░█░█░░░█░█░█▀█░█▀▄░░█░░█░█░█░█░░░░█░░█▀█░░█░░▀▀█░░░█░█░█▀▀░░░█▀█░▀▀█░░░░█░░░░█░█░█░█░░░
░▀▀▀░░░▀░▀░░░▀░▀░▀░▀░▀░▀░▀▀▀░▀░▀░▀▀▀░░░░▀░░▀░▀░▀▀▀░▀▀▀░░░▀▀▀░▀░░░░░▀░▀░▀▀▀░░░▀▀▀░░░▀▀▀░▀▀▀░▀░
`);
  catchTheKonami();
}
</script>
