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
    let node: AudioNode = this.chain[0]

    for (let i = 1; i < this.chain.length; i++) {
      const nextNode: AudioNode = this.chain[i]
      node.connect(nextNode)
      node = nextNode
    }
  }
}
