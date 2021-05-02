import BaseAudio from './BaseAudio'

export default class NodeChain extends BaseAudio {
  chain: AudioNode[]

  constructor() {
    super()

    this.chain = [this.analyser, this.context.destination]
  }

  addNode(node: AudioNode) {
    this.chain.splice(this.chain.length - 2, 0, node)
  }

  connect() {
    for (let i = 0; i < this.chain.length - 1; i++) {
      const node: AudioNode = this.chain[i]
      const nextNode: AudioNode = this.chain[i+1]

      node.connect(nextNode)
    }
  }
}
