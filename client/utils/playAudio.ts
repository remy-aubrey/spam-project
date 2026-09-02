export default function playAudio(file: string) {
  const sound = new Audio(file)
  sound.play()
}
