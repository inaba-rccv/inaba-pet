import type { DialogueData, SoliloquizeData } from "@inabapet/types"

export class ChatService {
  private soliloquizeData: SoliloquizeData[]
  private dialogueData: DialogueData[]

  constructor() {
    this.soliloquizeData = [
      { message: '你点你*呢' },
      { message: '不许点了' },
      { message: '你耳朵🐉啊' },
      { message: '?' },
      { message: '何意味' },
      { message: '干什么！' },
    ]

    this.dialogueData = [
      {
        message: '我可爱吗?',
        option: [
          {
            label: '嗯呢',
            event: 'favorUp',
            payload: [20],
            type: 'warning'
          },
          {
            label: '?',
            event: 'favorDown',
            payload: [20],
            type: 'danger'
          },
        ]
      },
      {
        message: '不许点了',
        option: [{ label: '好吧', type: 'primary' }]
      },
      {
        message: '你耳朵🐉啊',
        option: [{ label: '对不起', type: 'primary' }]
      },
      {
        message: '你点你*呢',
        option: [{ label: '对不起', type: 'primary' }]
      },
      {
        message: '何意味',
        option: [{ label: '?', type: 'primary' }]
      },
      {
        message: '干什么！',
        option: [{ label: '对不起', type: 'primary' }]
      },
      {
        message: '何意味',
        option: [{ label: '?', type: 'primary' }]
      },
      {
        message: '干什么！',
        option: [
          {
            label: '我喜欢你',
            event: 'favorUp',
            payload: [10],
            type: 'warning'
          },
          {
            label: '爬',
            event: 'healthDown',
            payload: [20],
            type: 'danger'
          },
        ]
      },
      {
        message: "你敢说我？胆子肥了",
        option: [
          { label: "误会", type: "primary" }
        ]
      },
    ]
  }

  getSoliloquize(): SoliloquizeData {
    const index = Math.floor(Math.random() * this.soliloquizeData.length)
    return this.soliloquizeData[index]!
  }

  getDialogue(): DialogueData {
    const index = Math.floor(Math.random() * this.dialogueData.length)
    return this.dialogueData[index]!
  }
}