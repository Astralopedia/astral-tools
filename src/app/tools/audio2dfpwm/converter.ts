enum VARS {
	SAMPLE_RATE = 48000,
	PREC = 10,
}

function encodeDfpwm(input: Float32Array): Int8Array {
	let charge = 0
	let strength = 0
	let previousBit = false

	const result = new Int8Array(Math.floor(input.length / 8))

	for (let i = 0; i < input.length; i++) {
		let byte = 0

		for (let j = 0; j < 8; j++) {
			const level = Math.floor(input[i * 8 + j] * 127)
			const currentBit =
				level > charge || (level == charge && charge == 127)
			const target = currentBit ? 127 : -128

			let nextCharge =
				charge +
				((strength * (target - charge) + (1 << (VARS.PREC - 1))) >>
					VARS.PREC)
			if (nextCharge == charge && nextCharge != target)
				nextCharge += currentBit ? 1 : -1

			const z = currentBit == previousBit ? (1 << VARS.PREC) - 1 : 0
			let nextStrength = strength
			if (strength != z)
				nextStrength += currentBit == previousBit ? 1 : -1
			if (nextStrength < 2 << (VARS.PREC - 8))
				nextStrength = 2 << (VARS.PREC - 8)

			charge = nextCharge
			strength = nextStrength
			previousBit = currentBit

			byte = currentBit ? (byte >> 1) + 128 : byte >> 1
		}

		result[i] = byte
	}

	return result
}

export async function convertAudio(input: ArrayBuffer): Promise<ArrayBuffer> {
	const audioContext = new OfflineAudioContext({
		numberOfChannels: 1,
		sampleRate: VARS.SAMPLE_RATE,
		length: 1,
	})

	try {
		const audioBuffer = await audioContext.decodeAudioData(input)

		const duration = audioBuffer.length / audioBuffer.sampleRate

		const newAudioBuffer = new OfflineAudioContext({
			numberOfChannels: 1,
			sampleRate: VARS.SAMPLE_RATE,
			length: Math.ceil(duration * VARS.SAMPLE_RATE),
		})

		const source = newAudioBuffer.createBufferSource()
		source.buffer = audioBuffer
		source.connect(newAudioBuffer.destination)
		source.start()

		const renderedAudioBuffer = await newAudioBuffer.startRendering()

		source.stop()
		source.disconnect()

		const audioData = renderedAudioBuffer.getChannelData(0)

		return encodeDfpwm(audioData)
	} catch (e) {
		throw e as Error
	}
}
