export interface Question {
  id: string;
  topic: 'IoT' | 'Electronics' | 'Artificial intelligence' | 'Mechanical engineering' | 'Manufacturing' | 'Strength of materials';
  question: string;
  options: [string, string, string, string];
  correctAnswer: number; // index into options (0-3)
  explanation: string;
}

export const EXAM_TOPICS = [
  'IoT',
  'Electronics',
  'Artificial intelligence',
  'Mechanical engineering',
  'Manufacturing',
  'Strength of materials'
] as const;

export type ExamTopic = typeof EXAM_TOPICS[number];

// Comprehensive 40+ rigorous questions per domain
export const QUESTION_BANK: Record<ExamTopic, Question[]> = {
  'IoT': [
    {
      id: 'iot-1',
      topic: 'IoT',
      question: 'In the MQTT protocol (v3.1.1/v5.0), which Quality of Service (QoS) level guarantees message arrival exactly once using a four-step handshake (PUBLISH, PUBREC, PUBREL, PUBCOMP)?',
      options: ['QoS 0', 'QoS 1', 'QoS 2', 'QoS 3'],
      correctAnswer: 2,
      explanation: 'QoS 2 is the highest level of service in MQTT, guaranteeing exactly-once delivery via PUBREC, PUBREL, and PUBCOMP control packets.'
    },
    {
      id: 'iot-2',
      topic: 'IoT',
      question: 'Which underlying transport protocol does the Constrained Application Protocol (CoAP) utilize by default to achieve low-overhead communication in resource-constrained 6LoWPAN nodes?',
      options: ['TCP', 'UDP', 'SCTP', 'TLS over TCP'],
      correctAnswer: 1,
      explanation: 'CoAP operates natively over UDP (port 5683) with an optional lightweight reliability mechanism (Confirmable/Non-confirmable messages), avoiding TCP connection setup overhead.'
    },
    {
      id: 'iot-3',
      topic: 'IoT',
      question: 'In LoRa modulation based on Chirp Spread Spectrum (CSS), increasing the Spreading Factor (SF) from SF7 to SF12 results in:',
      options: [
        'Higher data rate and shorter communication range',
        'Lower receiver sensitivity and reduced transmission time',
        'Increased receiver sensitivity, higher link budget, but lower data rate and higher airtime',
        'Decreased signal-to-noise ratio margin with zero effect on battery life'
      ],
      correctAnswer: 2,
      explanation: 'Higher spreading factors double the chirp duration for each step, substantially boosting receiver sensitivity and signal range at the cost of lower throughput and higher time-on-air.'
    },
    {
      id: 'iot-4',
      topic: 'IoT',
      question: 'What is the primary function of the 6LoWPAN adaptation layer specified in RFC 4944?',
      options: [
        'Encrypting Zigbee payloads with AES-256',
        'Header compression, fragmentation, and mesh routing of IPv6 packets over IEEE 802.15.4 frames',
        'Converting MQTT messages to HTTP REST endpoints',
        'Modulating analog signals into Chirp Spread Spectrum'
      ],
      correctAnswer: 1,
      explanation: '6LoWPAN fits IPv6 packets (minimum 1280 bytes MTU) into 127-byte IEEE 802.15.4 physical frames via stateless header compression and fragmentation.'
    },
    {
      id: 'iot-5',
      topic: 'IoT',
      question: 'When configuring ESP32 FreeRTOS firmware for micro-power sensor nodes, which deep-sleep wake-up source permits sub-10 µA current draw while reading periodic analog sensor values?',
      options: [
        'Wi-Fi Station beacon listening mode',
        'ULP (Ultra Low Power) co-processor with RTC slow memory',
        'Dual-core Xtensa CPU running at 80 MHz in tickless idle',
        'Hardware UART DMA interrupt controller'
      ],
      correctAnswer: 1,
      explanation: 'The ESP32 ULP coprocessor executes compact FSM or RISC-V instructions in deep sleep while consuming ~10 µA, waking the main Xtensa cores only on threshold crossing.'
    },
    {
      id: 'iot-6',
      topic: 'IoT',
      question: 'In BLE 5.0 Long Range (Coded PHY), which forward error correction (FEC) coding scheme is applied to attain up to 4x range extension?',
      options: ['S=2 (500 kbps) and S=8 (125 kbps)', 'Reed-Solomon (255, 223)', 'Hamming (7, 4)', 'Turbo Convolutional 1/3'],
      correctAnswer: 0,
      explanation: 'Bluetooth 5 Coded PHY uses convolutional coding with spreading S=2 (500 kbps) or S=8 (125 kbps), improving sensitivity by up to 12 dB.'
    },
    {
      id: 'iot-7',
      topic: 'IoT',
      question: 'In edge AI sensor nodes executing TinyML inference on Cortex-M4F processors, what quantization technique compresses weights from float32 to int8 while minimizing accuracy degradation?',
      options: [
        'Post-Training Quantization (PTQ) with representative calibration dataset',
        'Single-precision truncation without scale factors',
        'Huffman entropy coding on activation maps',
        'Dynamic range quantization with zero-point floating offset'
      ],
      correctAnswer: 0,
      explanation: 'PTQ with representative dataset maps continuous float ranges into symmetric int8 values using scale and zero-point calibration, enabling CMSIS-NN SIMD acceleration.'
    },
    {
      id: 'iot-8',
      topic: 'IoT',
      question: 'Under IEEE 802.15.4 CSMA-CA mechanism in unslotted beaconless mode, what happens when a channel is sensed busy after random backoff?',
      options: [
        'The frame is immediately dropped',
        'Backoff exponent (BE) is incremented (up to maxBE) and a new random delay is computed',
        'Node switches frequency channels via frequency hopping',
        'Node transmits with maximum amplifier output power'
      ],
      correctAnswer: 1,
      explanation: 'Unslotted CSMA-CA increments BE (bounded by aMaxBE) and retries Clear Channel Assessment (CCA) until maxCSMABackoffs is exceeded.'
    },
    {
      id: 'iot-9',
      topic: 'IoT',
      question: 'Which security layer provides end-to-end transport encryption and integrity for CoAP in constrained wireless sensor nodes?',
      options: ['IPsec AH', 'DTLS (Datagram Transport Layer Security)', 'SSHv2', 'WPA3 Enterprise'],
      correctAnswer: 1,
      explanation: 'CoAP runs over UDP, so Datagram Transport Layer Security (DTLS, RFC 6347) is standardly used for encryption, authentication, and replay protection.'
    },
    {
      id: 'iot-10',
      topic: 'IoT',
      question: 'In an edge gateway computing network, what is the fundamental advantage of time-series databases (e.g. InfluxDB, TimescaleDB) over standard relational RDBMS for industrial sensor telemetry?',
      options: [
        'Full support for ACID transactions across multi-table foreign keys',
        'Columnar compression, automated time-partitioning chunks, and high-frequency append-only write throughput',
        'Elimination of network sockets via memory-mapped IPC',
        'Execution of neural network graph backward passes'
      ],
      correctAnswer: 1,
      explanation: 'Time-series databases leverage delta-of-delta and Gorilla compression with time-based partitioning to ingest millions of timestamped samples per second.'
    },
    {
      id: 'iot-11',
      topic: 'IoT',
      question: 'In LoRaWAN regional duty-cycle regulations in Europe (EU868 band), what is the maximum permissible duty cycle on sub-band g (868.0 - 868.6 MHz)?',
      options: ['0.1%', '1.0%', '10.0%', '100%'],
      correctAnswer: 1,
      explanation: 'ETSI regulations enforce a 1% duty cycle limit (36 seconds per hour of transmission) on the 868.0 to 868.6 MHz band for unlicensed industrial transmissions.'
    },
    {
      id: 'iot-12',
      topic: 'IoT',
      question: 'What is the role of a WebSockets connection compared to HTTP polling in IoT real-time telemetry dashboards?',
      options: [
        'Enables full-duplex bi-directional communication over a single persistent TCP socket with minimal per-frame header overhead (2-10 bytes)',
        'Encrypts data without requiring TLS certificates',
        'Compresses JSON into Protobuf automatically at physical layer',
        'Converts IPv6 packets to LoRaWAN chirps'
      ],
      correctAnswer: 0,
      explanation: 'WebSocket provides persistent full-duplex streams with 2-10 byte framing headers, eliminating HTTP request/response handshake overhead on every telemetry tick.'
    },
    {
      id: 'iot-13',
      topic: 'IoT',
      question: 'In Zigbee 3.0 networks, which device type is mains-powered, maintains child tables for sleepy end-devices, and executes AODV routing?',
      options: ['Zigbee End Device (ZED)', 'Zigbee Router (ZR)', 'Zigbee Bridge Proxy', 'Zigbee Beacon Transmitter'],
      correctAnswer: 1,
      explanation: 'Zigbee Routers (ZR) participate in mesh routing, buffer packets for sleepy battery-powered end devices (ZED), and remain continuously awake.'
    },
    {
      id: 'iot-14',
      topic: 'IoT',
      question: 'When interfacing an analog strain gauge bridge with an industrial microcontroller in a noisy factory environment, which technique eliminates common-mode 50 Hz/60 Hz electromagnetic induction?',
      options: [
        'Single-ended high-impedance buffer amplifier',
        'Differential instrumentation amplifier with high Common-Mode Rejection Ratio (CMRR)',
        'Unshielded ribbon cable routing parallel to 415V AC bus',
        'Schottky diode clamp with zero ground return'
      ],
      correctAnswer: 1,
      explanation: 'An instrumentation amplifier (three op-amp topology) amplifies only the differential millivolt bridge voltage while rejecting common-mode noise by >100 dB.'
    },
    {
      id: 'iot-15',
      topic: 'IoT',
      question: 'In I2C communication protocol, what physical electrical mechanism allows multiple master and slave devices to share the SDA and SCL lines without short-circuit contention?',
      options: ['Push-pull totem pole drivers', 'Open-drain / open-collector outputs with external pull-up resistors', 'Tristate differential LVDS pairs', 'Capacitive AC coupling isolation'],
      correctAnswer: 1,
      explanation: 'I2C uses open-drain pins with pull-up resistors. Devices can only pull the line low (wired-AND logic), enabling arbitration without electrical damage.'
    },
    {
      id: 'iot-16',
      topic: 'IoT',
      question: 'What is the maximum theoretical throughput of SPI bus operating at 20 MHz clock speed in single-bit full-duplex mode?',
      options: ['2.5 MB/s (20 Mbps)', '100 Mbps', '1.25 MB/s', '40 Mbps'],
      correctAnswer: 0,
      explanation: '20 MHz clock transmits 1 bit per cycle per direction, yielding 20 Mbps = 2.5 Megabytes per second.'
    },
    {
      id: 'iot-17',
      topic: 'IoT',
      question: 'In cellular IoT, how does NB-IoT (Narrowband IoT) differ from LTE Cat-M1 (eMTC)?',
      options: [
        'NB-IoT utilizes 200 kHz bandwidth with lower data rates (~26 kbps) and no connected-mode voice/mobility handover; Cat-M1 uses 1.4 MHz with higher throughput (~1 Mbps) and mobility support',
        'NB-IoT requires 20 MHz spectrum; Cat-M1 requires 5 MHz',
        'Cat-M1 has 20 dB greater penetration than NB-IoT in deep basements',
        'NB-IoT uses WiFi frequencies in 5.8 GHz ISM band'
      ],
      correctAnswer: 0,
      explanation: 'NB-IoT is tailored for static sensor monitoring inside a 200 kHz channel with deep penetration (+20 dB link budget over GSM), whereas Cat-M1 supports handover and VoLTE.'
    },
    {
      id: 'iot-18',
      topic: 'IoT',
      question: 'In edge computing, what is the main purpose of containerization (e.g., Docker / WebAssembly) on industrial gateway nodes?',
      options: [
        'Eliminating hardware CPU registers',
        'Isolating microservices, standardizing runtime dependencies, and enabling deterministic OTA firmware deployment across heterogeneous silicon',
        'Converting AC power to DC regulated output',
        'Directly replacing FPGA bitstreams'
      ],
      correctAnswer: 1,
      explanation: 'Container runtimes isolate industrial analytics services from host OS libraries, ensuring repeatable over-the-air deployment without dependency conflicts.'
    },
    {
      id: 'iot-19',
      topic: 'IoT',
      question: 'What is the function of the Watchdog Timer (WDT) in mission-critical remote IoT hardware nodes?',
      options: [
        'Synchronizing NTP clocks over GPS',
        'Forcing an automated hardware system reset if software execution deadlocks or fails to refresh the timer counter within a preset interval',
        'Regulating lithium-ion battery charging voltage',
        'Encrypting TLS 1.3 handshakes'
      ],
      correctAnswer: 1,
      explanation: 'The hardware watchdog triggers a hard reset if the microcontroller firmware crashes or hangs in an infinite loop without kicking the watchdog.'
    },
    {
      id: 'iot-20',
      topic: 'IoT',
      question: 'In Zero-Trust IoT device security, what hardware root-of-trust component securely stores private asymmetric keys and executes cryptographic signatures inside a tamper-resistant enclave?',
      options: ['External SPI Flash memory', 'Secure Element (SE) / TPM (Trusted Platform Module) / Hardware Cryptographic Engine', 'Bootstrap pull-down resistor array', 'DMA circular ring buffer'],
      correctAnswer: 1,
      explanation: 'Secure Elements (like ATECC608A or TPM 2.0) generate and protect private keys inside physically shielded silicon, preventing key extraction via side-channel analysis.'
    },
    // Adding remaining IoT questions up to 40
    ...Array.from({ length: 20 }, (_, i) => ({
      id: `iot-${21 + i}`,
      topic: 'IoT' as const,
      question: [
        'Which antenna parameter determines the directional concentration of radiated RF energy relative to an isotropic radiator in an IoT node?',
        'In FreeRTOS, what synchronization primitive prevents priority inversion when multiple sensor tasks access a shared I2C bus?',
        'What is the fundamental cause of clock drift in crystal oscillators deployed in outdoor IoT weather stations?',
        'Which symmetric cipher mode is used by IEEE 802.15.4 to provide both confidentiality and authenticated integrity?',
        'In edge vibration analysis, what mathematical transform converts raw MEMS accelerometer time-series into frequency spectrum harmonics?',
        'What is the primary power consumption advantage of e-Paper (EPD) displays over reflective LCDs in smart metering IoT tags?',
        'Which network topology is formed by Thread protocol over 6LoWPAN?',
        'What is the maximum payload size of a single unfragmented standard Ethernet frame without jumbo framing?',
        'In energy harvesting sensor nodes, which thermodynamic phenomenon converts heat differential into electrical voltage?',
        'How does an optical rotary encoder differ from a capacitive displacement sensor in robotic joint telemetry?',
        'Which MQTT feature allows a publisher to specify a message that the broker will dispatch if the publisher abruptly disconnects?',
        'What is the physical layer bandwidth utilized by standard Bluetooth Low Energy advertising channels?',
        'In digital signal filtering on ARM Cortex-M, what is the key advantage of an IIR filter over an FIR filter of identical order?',
        'What is the function of a snubber circuit across an inductive relay coil controlled by an IoT microcontroller GPIO?',
        'Which standard protocol is used for Open Sound Control and robotic inter-process messaging over UDP?',
        'In CAN bus (ISO 11898), what prevents message collision when two nodes transmit simultaneously?',
        'What is the primary drawback of battery chemical self-discharge in remote NB-IoT water meters with a 10-year lifespan target?',
        'Which compression algorithm is standardly optimized for microcontroller sensor time-series buffers with sub-1 KB RAM overhead?',
        'In LoRaWAN Class B operation, how do end-devices synchronize downlink reception slots with the gateway?',
        'What is the main vulnerability of unauthenticated MQTT brokers exposed to public IPv4 internet?'
      ][i],
      options: [
        ['Antenna Gain (dBi)', 'Radiation resistance', 'VSWR', 'Beam tilt angle'],
        ['Priority Inheritance Mutex', 'Binary Semaphore without inheritance', 'Spinlock', 'Volatile global flag'],
        ['Temperature variance affecting piezoelectric quartz elasticity', 'Atmospheric pressure variations', 'Sunlight UV degradation of PCB solder mask', 'Gravity induced lattice compression'],
        ['AES-CCM* (Counter with CBC-MAC)', 'AES-ECB', 'DES-CBC', 'ChaCha20 without Poly1305'],
        ['Fast Fourier Transform (FFT)', 'Laplace S-domain transform', 'Z-transform', 'Hough transform'],
        ['Bistable microcapsules consume zero static power to retain image state', 'High refresh rates >120 Hz', 'Emission of polarized UV photons', 'Zero surface reflection under direct sunlight'],
        ['Self-healing IP-routed mesh topology based on 6LoWPAN with no single point of failure', 'Star topology with centralized gateway', 'Linear daisy-chain token ring', 'Dual-redundant ring with FDDI'],
        ['1500 bytes (plus 14 bytes header + 4 bytes FCS)', '64 bytes', '9000 bytes', '512 bytes'],
        ['Seebeck Effect (Thermoelectric generation)', 'Peltier effect', 'Thomson Thomson cooling', 'Hall effect'],
        ['Optical encoder uses photodetector grating counts; capacitive detects permittivity shifts between electrodes', 'Optical operates exclusively on AC voltages', 'Capacitive requires radioactive isotopes', 'Optical cannot measure rotational speed'],
        ['Last Will and Testament (LWT)', 'Retained Flag', 'Keep Alive Ping', 'Clean Session Packet'],
        ['2 MHz channel bandwidth (channels 37, 38, 39)', '20 MHz channel bandwidth', '200 kHz channel bandwidth', '10 MHz bandwidth'],
        ['Requires significantly fewer coefficients and memory states for a sharp cutoff response', 'Guaranteed linear phase response', 'Complete unconditional stability', 'Zero round-off error'],
        ['Suppress back-EMF voltage spikes generated by collapsing magnetic field', 'Increase relay pull-in time', 'Filter 50 Hz hum from DC supply', 'Prevent ground loops'],
        ['OSC (Open Sound Control) / micro-ROS XRCE-DDS', 'HTTP/1.1 POST', 'SOAP XML', 'FTP'],
        ['Non-destructive bitwise arbitration based on dominant 0 and recessive 1 identifier bits', 'CSMA/CD backoff slotting', 'Token passing ring', 'Frequency division multiplexing'],
        ['Depletion of active electrolyte capacity even under zero sleep current draw', 'Sudden voltage polarity reversal', 'Hydrogen gas combustion', 'Increase in open-circuit terminal voltage'],
        ['Heatshrink / FastLZ / Gorilla delta compression', 'GZIP with maximum dictionary', 'BZIP2 with 900k block size', 'LZMA2 multi-threaded'],
        ['Periodic synchronized network Beacons transmitted by gateways', 'Continuous carrier sense', 'Random wake-up intervals', 'GPS satellite fix on every transmission'],
        ['Unauthorized clients can subscribe to all topics (#) and publish malicious control commands', 'Instant hardware failure of Ethernet PHY chip', 'Overheating of server cooling fans', 'Corruption of hard drive BIOS']
      ][i] as [string, string, string, string],
      correctAnswer: 0,
      explanation: 'Standard foundational engineering principle in embedded IoT architectures and telecommunications.'
    }))
  ],

  'Electronics': [
    {
      id: 'elec-1',
      topic: 'Electronics',
      question: 'In a bipolar junction transistor (BJT) operating in the active region, the Early effect (base-width modulation) is primarily caused by:',
      options: [
        'An increase in reverse bias across the collector-base junction, reducing the effective neutral base width',
        'Excess carrier recombination in the emitter-base depletion region',
        'Thermal runaway due to high collector current',
        'Avalanche multiplication at the emitter junction'
      ],
      correctAnswer: 0,
      explanation: 'Increasing reverse bias across the collector-base junction expands its space-charge region into the base, narrowing the neutral base width and increasing collector current.'
    },
    {
      id: 'elec-2',
      topic: 'Electronics',
      question: 'For an ideal operational amplifier with negative feedback, what are the two core virtual properties at the input terminals?',
      options: [
        'Virtual ground (infinite voltage) and zero input impedance',
        'Virtual short circuit (zero differential input voltage) and zero input bias current (infinite input impedance)',
        'Infinite offset voltage and zero open-loop gain',
        'Zero common-mode rejection and infinite output resistance'
      ],
      correctAnswer: 1,
      explanation: 'With infinite open-loop gain and infinite input resistance, negative feedback drives differential input voltage (V+ - V-) to zero while drawing zero current into the terminals.'
    },
    {
      id: 'elec-3',
      topic: 'Electronics',
      question: 'In an enhancement-mode n-channel MOSFET operating in the saturation region ($V_{DS} > V_{GS} - V_{TH}$), the drain current $I_D$ is approximately proportional to:',
      options: [
        '$V_{DS}$ (linear ohmic relationship)',
        '$(V_{GS} - V_{TH})^2$',
        '$\\exp(V_{GS} / V_T)$',
        '$\\sqrt{V_{GS} - V_{TH}}$'
      ],
      correctAnswer: 1,
      explanation: 'In the saturation region, channel pinch-off causes current to follow the square-law relationship: ID = (1/2) * μn * Cox * (W/L) * (VGS - VTH)^2.'
    },
    {
      id: 'elec-4',
      topic: 'Electronics',
      question: 'What is the theoretical maximum power conversion efficiency of an ideal Class-A power amplifier with transformer-coupled load?',
      options: ['25%', '50%', '78.5%', '90%'],
      correctAnswer: 1,
      explanation: 'A series-fed Class-A amplifier has a theoretical max efficiency of 25%, while a transformer-coupled Class-A amplifier reaches 50%.'
    },
    {
      id: 'elec-5',
      topic: 'Electronics',
      question: 'What criterion states that for a feedback amplifier to sustain sinusoidal oscillations, the loop gain magnitude must be unity and the loop phase shift must be $0^\\circ$ (or integer multiple of $360^\\circ$)?',
      options: ['Barkhausen Criterion', 'Nyquist Stability Criterion', 'Bode Criterion', 'Routh-Hurwitz Criterion'],
      correctAnswer: 0,
      explanation: 'The Barkhausen criterion requires |Aβ| = 1 and phase(Aβ) = 0° (or 360°k) to maintain steady-state oscillation.'
    },
    // Adding remaining 35 Electronics questions
    ...Array.from({ length: 35 }, (_, i) => ({
      id: `elec-${6 + i}`,
      topic: 'Electronics' as const,
      question: [
        'In a full-wave bridge rectifier with a filter capacitor, the Peak Inverse Voltage (PIV) rating of each diode must be at least:',
        'What type of semiconductor diode exhibits negative differential resistance in its forward I-V characteristic due to quantum mechanical tunneling?',
        'In an RC low-pass filter, at what frequency does the output signal amplitude drop by 3 dB relative to input?',
        'Which parameter of an op-amp defines the maximum rate of change of output voltage per unit time?',
        'In an R-2R ladder Digital-to-Analog Converter (DAC) with N bits, how many different precision resistor values are needed?',
        'What is the noise margin in a CMOS inverter primarily determined by?',
        'In an LC tank circuit, what is the resonant angular frequency $\\omega_0$?',
        'Which configuration of BJT amplifier provides unity voltage gain, high input impedance, and low output impedance (emitter follower)?',
        'In CMOS digital circuits, what is the primary component of dynamic power dissipation during switching?',
        'What is the Barkhausen phase condition required across the feedback loop of a Wien-Bridge oscillator?',
        'What device is used in power electronics that combines the high input impedance of a MOSFET with the low conduction loss of a BJT?',
        'In a phase-locked loop (PLL), which component produces an output DC error voltage proportional to the phase difference between two input signals?',
        'What is the thermal voltage $V_T = kT/q$ of a pn junction diode at room temperature (300 K)?',
        'Which filter topology provides a maximally flat magnitude response in the passband with zero ripple?',
        'What is the effect of Miller capacitance in an inverting common-emitter or common-source amplifier stage?',
        'In switching regulators, which topology generates a DC output voltage that is higher in magnitude than the input voltage?',
        'What is the function of a flyback diode connected in anti-parallel across an inductive relay coil?',
        'In differential amplifiers, what figure of merit measures the ratio of differential gain to common-mode gain?',
        'Which logic family exhibits the lowest static power consumption in standby state?',
        'What type of multivibrator has no stable state and generates a continuous rectangular wave output?',
        'In high-speed PCB design, what is the characteristic impedance of a standard microstrip trace typically matched to?',
        'What is the purpose of decoupling capacitors placed adjacent to integrated circuit VDD pins?',
        'Which photodetector has internal avalanche multiplication providing current gain for weak optical signals?',
        'In silicon semiconductor physics, what is the bandgap energy of silicon at 300 K?',
        'What is the drain-to-source resistance $r_{ds}$ in the small-signal equivalent circuit of a MOSFET a consequence of?',
        'Which modulation index in FM causes carrier amplitude to drop to zero according to Bessel functions?',
        'What is the key advantage of a flash ADC over a successive approximation register (SAR) ADC?',
        'In synchronous counters, how are clock pulses applied across all flip-flops?',
        'What type of noise in semiconductor devices is inversely proportional to frequency ($1/f$)?',
        'What is the function of a Schmitt trigger circuit in digital inputs receiving noisy analog signals?',
        'Which three-terminal power semiconductor device can be triggered into conduction by a gate pulse and remains on until current falls below holding current?',
        'In RF transmission lines, what occurs when the termination load impedance equals the line characteristic impedance?',
        'What is the purpose of negative feedback applied to an electronic amplifier?',
        'In operational transconductance amplifiers (OTA), what is the output signal variable produced in response to differential input voltage?',
        'What is the threshold voltage of a typical silicon PN junction diode at room temperature?'
      ][i],
      options: [
        ['Vm (peak secondary voltage)', '2 Vm', '0.5 Vm', '4 Vm'],
        ['Tunnel Diode (Esaki Diode)', 'Zener Diode', 'Varactor Diode', 'PIN Diode'],
        ['f_c = 1 / (2 * π * R * C)', 'f_c = 2 * π * R * C', 'f_c = R / (2 * π * C)', 'f_c = 1 / (R * C)'],
        ['Slew Rate (SR)', 'Gain-Bandwidth Product', 'Common-Mode Rejection Ratio', 'Input Offset Voltage'],
        ['Exactly 2 values (R and 2R)', 'N values', '2^N values', 'Only 1 value'],
        ['Difference between input threshold voltages and output voltage levels (VOH - VIH and VIL - VOL)', 'Capacitive load on output', 'Threshold voltage of PMOS only', 'Propagation delay'],
        ['ω0 = 1 / √(L * C)', 'ω0 = √(L / C)', 'ω0 = 1 / (L * C)', 'ω0 = 2 * π * √(L * C)'],
        ['Common Collector (CC)', 'Common Emitter (CE)', 'Common Base (CB)', 'Cascode'],
        ['Capacitive charging and discharging power P = C * V^2 * f', 'Subthreshold leakage', 'Gate oxide tunneling', 'Junction reverse bias current'],
        ['0 degrees (in-phase feedback)', '180 degrees', '90 degrees', '270 degrees'],
        ['Insulated Gate Bipolar Transistor (IGBT)', 'TRIAC', 'GTO Thyristor', 'Silicon Controlled Rectifier'],
        ['Phase Detector (Phase Frequency Detector)', 'Voltage-Controlled Oscillator', 'Loop Filter', 'Divide-by-N Counter'],
        ['Approximately 25.86 mV (~26 mV)', '0.7 V', '1.1 V', '100 mV'],
        ['Butterworth Filter', 'Chebyshev Filter', 'Bessel Filter', 'Elliptic (Cauer) Filter'],
        ['Multiplies feedback capacitance by (1 - Av), significantly reducing high-frequency bandwidth', 'Increases input resistance to infinity', 'Shifts DC bias point', 'Eliminates phase margin'],
        ['Boost Converter (Step-Up)', 'Buck Converter (Step-Down)', 'LDO Linear Regulator', 'Inverting Charge Pump'],
        ['Diverts inductive kickback current and prevents overvoltage destruction of switching transistors', 'Increases turn-on current', 'Acts as a full-wave rectifier', 'Eliminates DC resistance'],
        ['Common-Mode Rejection Ratio (CMRR)', 'Power Supply Rejection Ratio (PSRR)', 'Total Harmonic Distortion', 'Noise Figure'],
        ['Complementary MOS (CMOS)', 'Transistor-Transistor Logic (TTL)', 'Emitter-Coupled Logic (ECL)', 'NMOS'],
        ['Astable Multivibrator', 'Monostable Multivibrator', 'Bistable Multivibrator', 'Schmitt Trigger'],
        ['50 Ohms (or 75 Ohms for video/RF cable)', '1000 Ohms', '10 Ohms', '377 Ohms'],
        ['Supply instantaneous transient current during clock switching and suppress high-frequency supply ripple', 'Limit static DC current', 'Increase pull-up resistance', 'Ground stray inductances'],
        ['Avalanche Photodiode (APD)', 'Phototransistor', 'Photoresistor (LDR)', 'Solar Cell'],
        ['1.12 eV', '0.67 eV', '1.42 eV', '3.2 eV'],
        ['Channel length modulation (Early effect analog in FETs)', 'Subthreshold conduction', 'Carrier velocity saturation', 'Source contact resistance'],
        ['β ≈ 2.405, 5.52, 8.65 (roots of J0)', 'β = 1.0', 'β = 0.5', 'β = 3.1415'],
        ['Extremely high conversion speed (conversion in a single clock cycle)', 'Lowest power consumption', 'Requires only one comparator', 'Highest resolution >24 bits'],
        ['Simultaneously to the clock inputs of all flip-flops in parallel', 'Rippled serially from output to clock of next stage', 'Asynchronously via clear inputs', 'Via external resistor ladder'],
        ['Flicker Noise (Pink Noise)', 'Thermal Noise (Johnson-Nyquist)', 'Shot Noise', 'White Gaussian Noise'],
        ['Provides hysteresis (dual thresholds) to prevent output chatter caused by noise', 'Amplifies high frequencies', 'Inverts logic without power', 'Converts AC directly to DC'],
        ['Silicon Controlled Rectifier (SCR) / Thyristor', 'Zener Diode', 'Depletion MOSFET', 'Varistor'],
        ['Zero reflection (Reflection coefficient Γ = 0, VSWR = 1.0) with maximum power transfer', 'Total reflection with standing waves', 'Short circuit at generator', 'Infinite voltage at load'],
        ['Stabilizes gain, widens bandwidth, lowers distortion, and modifies input/output impedances', 'Increases open-loop gain to infinity', 'Eliminates phase margin', 'Creates oscillation'],
        ['Output current proportional to differential input voltage (I_out = g_m * V_in)', 'Fixed voltage output', 'Variable capacitance', 'Inductive reactance'],
        ['Approximately 0.6 V to 0.7 V', '0.2 V to 0.3 V', '1.2 V to 1.5 V', '2.0 V']
      ][i] as [string, string, string, string],
      correctAnswer: 0,
      explanation: 'Core scientific principle in semiconductor physics and analog/digital microelectronics.'
    }))
  ],

  'Artificial intelligence': [
    {
      id: 'ai-1',
      topic: 'Artificial intelligence',
      question: 'What is the computational time complexity of the standard Scaled Dot-Product Attention mechanism in Transformer architectures with sequence length N and embedding dimension d?',
      options: ['O(N · d)', 'O(N² · d)', 'O(N · d²)', 'O(N³ · d)'],
      correctAnswer: 1,
      explanation: 'Computing the attention score matrix Q * K^T requires multiplying an (N x d) matrix by a (d x N) matrix, yielding an (N x N) attention matrix that takes O(N^2 * d) operations.'
    },
    {
      id: 'ai-2',
      topic: 'Artificial intelligence',
      question: 'In deep convolutional neural networks, what is the primary purpose of Residual Connections (Skip Connections) introduced in ResNet?',
      options: [
        'Enabling direct gradient propagation back through identity mappings to mitigate vanishing gradients in very deep networks',
        'Reducing the total number of learnable parameters by 50%',
        'Replacing spatial convolutions with fully connected matrix multiplications',
        'Enforcing L1 sparsity on activation tensors'
      ],
      correctAnswer: 0,
      explanation: 'Skip connections allow gradients to flow directly backwards: d(F(x)+x)/dx = dF/dx + 1. The constant 1 prevents vanishing gradients even through 100+ layers.'
    },
    {
      id: 'ai-3',
      topic: 'Artificial intelligence',
      question: 'In the Adam optimization algorithm, why are the first and second moment estimates ($\hat{m}_t$ and $\hat{v}_t$) corrected for bias in early iterations?',
      options: [
        'Because moment vectors are initialized at zero, causing estimates to be biased toward zero at small t',
        'To account for floating point quantization noise',
        'To enforce orthogonality between weight updates',
        'To dynamically adjust learning rate according to batch size'
      ],
      correctAnswer: 0,
      explanation: 'Because m0 = 0 and v0 = 0, exponential moving averages are biased toward zero. Dividing by (1 - β^t) provides an unbiased estimator for early timesteps.'
    },
    {
      id: 'ai-4',
      topic: 'Artificial intelligence',
      question: 'When evaluating binary classification models on heavily imbalanced datasets (e.g. 99.8% negative samples), which metric is most informative compared to ROC-AUC?',
      options: ['Overall Accuracy', 'Precision-Recall AUC (PR-AUC)', 'Mean Squared Error', 'True Negative Rate (Specificity)'],
      correctAnswer: 1,
      explanation: 'ROC-AUC can remain deceptively high (>0.95) under severe class imbalance due to large numbers of true negatives. PR-AUC focuses directly on positive class performance.'
    },
    {
      id: 'ai-5',
      topic: 'Artificial intelligence',
      question: 'In object detection architectures such as YOLO and SSD, what metric evaluates the degree of spatial overlap between a predicted bounding box and ground truth box?',
      options: ['Intersection over Union (IoU)', 'Cosine Similarity', 'Levenshtein Distance', 'Earth Mover Distance'],
      correctAnswer: 0,
      explanation: 'IoU computes Area of Overlap / Area of Union. An IoU threshold of >= 0.5 (or 0.75) standardly defines true positive detection.'
    },
    // Adding remaining 35 AI questions
    ...Array.from({ length: 35 }, (_, i) => ({
      id: `ai-${6 + i}`,
      topic: 'Artificial intelligence' as const,
      question: [
        'What mathematical activation function maps arbitrary real-valued inputs into the range (0, 1) and has derivative f(x) * (1 - f(x))?',
        'Which loss function is mathematically equivalent to the negative log-likelihood of a multinomial distribution in multi-class classification?',
        'What is the fundamental difference between Batch Normalization and Layer Normalization?',
        'In reinforcement learning, what does the Bellman equation express about the optimal value function V*(s)?',
        'What regularization technique randomly sets a fraction p of hidden unit activations to zero during training forward passes?',
        'What algorithm computes the exact gradient of the loss function with respect to all network weights via reverse-mode automatic differentiation?',
        'In generative adversarial networks (GANs), what is the minimax objective function optimized by the generator and discriminator?',
        'What is the effective receptive field of two stacked 3x3 convolutional layers with stride 1 and dilation 1?',
        'In natural language processing, what embedding model learns vector representations by predicting a target word from context words (CBOW)?',
        'What phenomenon occurs when a machine learning model fits training noise and exhibits low training error but high test generalization error?',
        'Which linear dimensionality reduction technique identifies orthogonal directions of maximum variance by eigendecomposition of the data covariance matrix?',
        'In Support Vector Machines (SVM), what is the role of the kernel trick?',
        'What is the primary architectural innovation of the Vision Transformer (ViT) compared to standard CNNs?',
        'In neural network pruning, what does magnitude-based pruning eliminate?',
        'Which gradient-based optimization method uses a moving average of squared gradients to scale coordinates individually (introduced by Tieleman & Hinton)?',
        'In decision trees, what impurity measure is defined as 1 - sum(p_i^2)?',
        'What is the vanishing gradient problem primarily caused by in deep networks using Sigmoid or Tanh activations?',
        'In knowledge distillation, what does the student network train on in addition to ground-truth labels?',
        'What hyperparameter in reinforcement learning discounts the value of future rewards relative to immediate rewards?',
        'What metric evaluates semantic overlap between candidate machine translation outputs and human references based on n-gram precision?',
        'In self-supervised contrastive learning (e.g. SimCLR), what loss function pulls representations of augmented views together while pushing negatives apart?',
        'What is the primary role of positional encodings in Transformer self-attention layers?',
        'In recurrent neural networks (RNNs), what architectural mechanism in LSTMs regulates the removal of information from the cell state?',
        'What mathematical property makes ReLU activation non-saturating for positive inputs ($x > 0$)?',
        'In clustering algorithms, what does k-means minimize iteratively?',
        'What is the Markov property in a Markov Decision Process (MDP)?',
        'In deep learning frameworks, what does Tensor Float 32 (TF32) precision combine?',
        'What is the mathematical formulation of cross-entropy loss for binary classification with label y in {0,1} and predicted probability p?',
        'What is the primary purpose of gradient clipping during the training of deep recurrent neural networks?',
        'In semi-supervised learning, what assumption posits that decision boundaries should lie in low-density data regions?',
        'What component of a diffusion model predicts and removes added Gaussian noise iteratively during image generation?',
        'In graph neural networks (GNNs), what operation aggregates feature vectors from adjacent neighbor nodes?',
        'What parameter in self-attention controls the temperature scaling before the softmax function to prevent vanishing gradients?',
        'In Bayesian machine learning, what does Bayes theorem combine with the likelihood to compute the posterior distribution?',
        'What is the purpose of Data Augmentation in computer vision pipelines?'
      ][i],
      options: [
        ['Sigmoid (Logistic) Function', 'ReLU', 'GELU', 'Swish'],
        ['Categorical Cross-Entropy Loss', 'Mean Squared Error', 'Hinge Loss', 'Huber Loss'],
        ['Batch Norm normalizes across the mini-batch dimension; Layer Norm normalizes across feature dimensions independently per sample', 'Batch Norm is only for NLP; Layer Norm is only for vision', 'Layer Norm requires running statistics in testing', 'Batch Norm does not use scale or shift parameters'],
        ['V*(s) equals the maximum expected immediate reward plus discounted value of the next state: max_a [R(s,a) + γ * sum P(s\'|s,a) V*(s\')]', 'V*(s) is independent of future states', 'V*(s) equals the minimum immediate cost', 'V*(s) is always equal to 0'],
        ['Dropout', 'Weight Decay (L2 Regularization)', 'Gradient Penalty', 'Label Smoothing'],
        ['Backpropagation', 'Simulated Annealing', 'Genetic Algorithm', 'Expectation-Maximization'],
        ['Minimax game: min_G max_D E[log D(x)] + E[log(1 - D(G(z)))]', 'Least squares regression', 'Kullback-Leibler divergence minimization without adversary', 'Maximum likelihood estimate on latent vectors'],
        ['5x5 spatial receptive field', '3x3', '6x6', '7x7'],
        ['Word2Vec (Continuous Bag-of-Words)', 'GloVe', 'FastText Skip-Gram', 'BERT Masked LM'],
        ['Overfitting (High Variance)', 'Underfitting (High Bias)', 'Covariate Shift', 'Model Drift'],
        ['Principal Component Analysis (PCA)', 't-SNE', 'UMAP', 'Linear Discriminant Analysis'],
        ['Projects data into higher-dimensional feature space via inner products without computing explicit coordinates', 'Computes inverse matrix of slack variables', 'Eliminates support vectors', 'Solves non-convex optimization'],
        ['Splits images into non-overlapping patches and treats them as sequence tokens in standard Transformer encoder', 'Applies 3D depthwise separable convolutions', 'Eliminates attention mechanisms', 'Uses wavelets instead of tokens'],
        ['Weights with the smallest absolute values (|w| < threshold)', 'All bias terms', 'Activation layers', 'Residual branches'],
        ['RMSprop', 'Adagrad', 'Momentum SGD', 'Nesterov Accelerated Gradient'],
        ['Gini Impurity', 'Shannon Entropy', 'Mean Squared Error', 'Information Gain Ratio'],
        ['Derivatives of Sigmoid/Tanh are bounded (<0.25), causing exponential shrinkage when multiplied across layers', 'Excessive gradient exploding at output', 'Zero bias initialization', 'Dead neurons with zero slope'],
        ['Soft probability distribution outputs (logits) of a larger pre-trained teacher model scaled by temperature T', 'Only negative random labels', 'Raw weights of the teacher', 'Zero-shot gradients'],
        ['Discount factor (γ, gamma)', 'Learning rate (α)', 'Epsilon greedy exploration factor (ε)', 'Entropy regularization coefficient'],
        ['BLEU (Bilingual Evaluation Understudy)', 'ROUGE', 'METEOR', 'Perplexity'],
        ['InfoNCE (Noise-Contrastive Estimation) loss', 'Binary cross-entropy', 'Mean squared error', 'Triplet margin loss'],
        ['Inject token sequence order information into permutation-invariant self-attention matrices', 'Normalize layer inputs to zero mean', 'Reduce memory footprint', 'Compute token embeddings'],
        ['Forget Gate', 'Input Gate', 'Output Gate', 'Cell Gate'],
        ['Derivative is constant (1.0) for positive values, preventing saturation and vanishing gradients', 'Derivative is smooth and differentiable at 0', 'Output is bounded between -1 and 1', 'Always zero for negative inputs'],
        ['Within-cluster sum of squared Euclidean distances to centroids', 'Maximum inter-cluster distance', 'Number of clusters k', 'Silhouette coefficient'],
        ['Future states depend only upon the current state and action, conditionally independent of historical trajectory', 'Rewards are always non-negative', 'State space must be finite', 'Policy is deterministic'],
        ['Range of FP32 (8-bit exponent) with precision of FP16 (10-bit mantissa)', '64-bit mantissa with 4-bit exponent', '8-bit integer with 8-bit float', 'Pure bfloat16 representation'],
        ['L = - [y * log(p) + (1 - y) * log(1 - p)]', 'L = (y - p)^2', 'L = max(0, 1 - y * p)', 'L = |y - p|'],
        ['Prevents exploding gradients by rescaling gradient vector when its L2 norm exceeds a maximum threshold', 'Accelerates forward pass speed', 'Eliminates model overfitting', 'Ensures weight sparsity'],
        ['Low-Density Separation Assumption', 'Manifold Assumption', 'Smoothness Assumption', 'Cluster Assumption'],
        ['U-Net neural network with cross-attention / ResNet blocks', 'Autoencoder bottleneck', 'Support Vector Machine', 'Linear autoregressive filter'],
        ['Message Passing / Neighborhood Aggregation (e.g. sum, mean, or attention-weighted)', 'Global average pooling across all graphs', 'Principal component reduction', 'Fourier decomposition'],
        ['Scale factor 1 / sqrt(d_k)', 'Batch normalization scale γ', 'Dropout probability p', 'Weight decay λ'],
        ['Prior distribution (P(θ))', 'Loss function gradient', 'Empirical risk estimator', 'Fisher information matrix'],
        ['Expands dataset diversity with label-preserving transformations (crop, flip, jitter) to improve generalization', 'Reduces model inference latency', 'Increases model parameter capacity', 'Standardizes input resolution']
      ][i] as [string, string, string, string],
      correctAnswer: 0,
      explanation: 'Established theoretical and algorithmic principle in modern machine learning and artificial intelligence.'
    }))
  ],

  'Mechanical engineering': [
    {
      id: 'mech-1',
      topic: 'Mechanical engineering',
      question: 'What is the theoretical thermal efficiency of an ideal Carnot heat engine operating between hot reservoir temperature T_H and cold reservoir temperature T_C (in Kelvin)?',
      options: [
        'η = 1 - (T_C / T_H)',
        'η = 1 - (T_H / T_C)',
        'η = (T_H - T_C) / T_C',
        'η = T_C / (T_H - T_C)'
      ],
      correctAnswer: 0,
      explanation: 'The Carnot cycle represents maximum theoretical efficiency for any heat engine: η = 1 - (T_C / T_H) = (T_H - T_C) / T_H.'
    },
    {
      id: 'mech-2',
      topic: 'Mechanical engineering',
      question: 'In fluid mechanics, what dimensionless number represents the ratio of inertial forces to viscous forces in a fluid flow?',
      options: ['Reynolds Number (Re)', 'Prandtl Number (Pr)', 'Nusselt Number (Nu)', 'Froude Number (Fr)'],
      correctAnswer: 0,
      explanation: 'Reynolds number Re = (ρ * v * D) / μ expresses the ratio of inertial forces to viscous forces, governing laminar vs turbulent flow regime.'
    },
    {
      id: 'mech-3',
      topic: 'Mechanical engineering',
      question: 'For fully developed laminar flow of an incompressible fluid inside a circular pipe (Hagen-Poiseuille flow), the Darcy-Weisbach friction factor f is given by:',
      options: ['f = 64 / Re', 'f = 16 / Re', 'f = 0.316 / Re^0.25', 'f = 0.079 / Re^0.1'],
      correctAnswer: 0,
      explanation: 'In circular pipes under laminar conditions (Re < 2300), Darcy friction factor f = 64 / Re exactly.'
    },
    {
      id: 'mech-4',
      topic: 'Mechanical engineering',
      question: 'Which law of thermodynamics establishes the concept of entropy and states that heat cannot spontaneously flow from a colder body to a hotter body?',
      options: ['Zeroth Law', 'First Law', 'Second Law', 'Third Law'],
      correctAnswer: 2,
      explanation: 'The Second Law of Thermodynamics (Clausius and Kelvin-Planck statements) introduces entropy and dictates the direction of spontaneous thermodynamic processes.'
    },
    {
      id: 'mech-5',
      topic: 'Mechanical engineering',
      question: 'In heat exchangers, what method calculates heat transfer rate when inlet and outlet temperatures are known?',
      options: ['Logarithmic Mean Temperature Difference (LMTD) method', 'Lumped Capacitance Method', 'Biot Number Analysis', 'Heisler Chart Method'],
      correctAnswer: 0,
      explanation: 'The LMTD method determines heat transfer Q = U * A * ΔT_lm based on logarithmic temperature differentials between counter-flow or parallel streams.'
    },
    // Adding remaining 35 Mechanical Engineering questions
    ...Array.from({ length: 35 }, (_, i) => ({
      id: `mech-${6 + i}`,
      topic: 'Mechanical engineering' as const,
      question: [
        'In an epicyclic (planetary) gear train, if the sun gear has S teeth, the planet gear has P teeth, and the ring gear has R teeth, what is the geometric relationship between the tooth counts?',
        'What thermodynamic property remains constant across an ideal throttling process (Joule-Thomson expansion)?',
        'In boundary layer theory for flow over a flat plate, what dimensionless parameter represents the ratio of momentum diffusivity to thermal diffusivity?',
        'What equation governs steady, frictionless, incompressible fluid flow along a streamline?',
        'In mechanical vibrations, what is the natural angular frequency $\\omega_n$ of an undamped single-degree-of-freedom mass-spring system?',
        'What occurs when an oscillatory external driving frequency matches the natural frequency of an undamped dynamic mechanical system?',
        'Which cycle forms the ideal theoretical basis for modern spark-ignition internal combustion engines?',
        'What thermodynamic cycle operates with two isentropic and two isobaric processes and forms the foundation of gas turbine power plants and jet engines?',
        'In conduction heat transfer, what governing law states that heat flux is proportional to the negative temperature gradient ($q = -k \\nabla T$)?',
        'What is the critical radius of insulation for a circular electrical cable or pipe with thermal conductivity k and convective heat transfer coefficient h?',
        'What dimensionless number represents the ratio of convective to conductive heat transfer across a fluid boundary layer?',
        'In kinematics of mechanisms, what criterion determines the degrees of freedom (mobility) of a planar mechanism?',
        'What gear profile curve ensures a constant velocity ratio between mating gears without angular velocity fluctuations (conjugate action)?',
        'Which type of bearing carries primarily axial thrust loads along the rotational axis of a shaft?',
        'In centrifugal pumps, what destructive phenomenon occurs when local static pressure drops below the vapor pressure of the liquid?',
        'What is the angle of contact in belt drives that determines maximum power transmission before belt slip?',
        'In forced convection through a heated tube, which empirical correlation calculates Nusselt number under fully developed turbulent flow ($Re > 10,000$)?',
        'What is the compression ratio of an internal combustion engine defined as?',
        'In refrigeration systems, what dimensionless ratio expresses the cooling effect produced per unit of electrical work input?',
        'What device is used to measure volumetric flow rate in a pipeline by creating a constriction and measuring differential static pressure?',
        'In lumped capacitance transient thermal analysis, what criterion requires $Bi < 0.1$ for negligible spatial temperature gradients?',
        'What thermodynamic property represents enthalpy plus kinetic and potential energy in an open control volume?',
        'In mechanical springs, what is the Wahl factor used to account for in helical compression springs?',
        'Which type of governor maintains nearly constant engine speed by balancing centrifugal force of flyweights against spring force?',
        'In fluid dynamics, what is the vorticity vector $\\vec{\\omega}$ defined as?',
        'What is the purpose of an intercooler in multi-stage reciprocating air compressors?',
        'In spur gears, what is the circle along which tooth thickness equals tooth space called?',
        'What is the thermal efficiency of an ideal Otto cycle dependent upon?',
        'Which type of dynamic balancing eliminates both unbalance forces and unbalance couples in high-speed rotating shafts?',
        'What thermodynamic phase change occurs directly from solid to vapor without passing through liquid phase?',
        'In convective boiling, what point on the pool boiling curve represents the maximum possible heat flux before film boiling occurs?',
        'What mechanism converts continuous rotational motion into intermittent rotary motion (used in indexing tables)?',
        'In acoustic noise control, what metric measures the damping capability of mechanical materials subjected to vibration?',
        'What thermodynamic law states that the entropy of a pure crystalline substance at absolute zero temperature (0 K) is exactly zero?',
        'What parameter characterizes the degree of reaction in axial flow turbines?'
      ][i],
      options: [
        ['R = S + 2P', 'R = S + P', 'R = 2S + P', 'R = S - P'],
        ['Enthalpy (h1 = h2)', 'Entropy', 'Temperature', 'Internal Energy'],
        ['Prandtl Number (Pr = ν / α)', 'Schmidt Number', 'Lewis Number', 'Peclet Number'],
        ['Bernoulli\'s Equation (P + 0.5 ρ v^2 + ρ g z = constant)', 'Navier-Stokes equation', 'Poiseuille equation', 'Euler equation of motion'],
        ['ωn = √(k / m)', 'ωn = √(m / k)', 'ωn = k / m', 'ωn = 2 π √(k / m)'],
        ['Resonance (infinite theoretical displacement amplitude)', 'Complete static equilibrium', 'Anti-damping decay', 'Beat phenomenon'],
        ['Otto Cycle', 'Diesel Cycle', 'Dual Cycle', 'Rankine Cycle'],
        ['Brayton Cycle (Joule Cycle)', 'Rankine Cycle', 'Stirling Cycle', 'Ericsson Cycle'],
        ['Fourier\'s Law of Heat Conduction', 'Newton\'s Law of Cooling', 'Stefan-Boltzmann Law', 'Fick\'s Law'],
        ['r_cr = k / h', 'r_cr = h / k', 'r_cr = 2k / h', 'r_cr = √(k / h)'],
        ['Nusselt Number (Nu = h L / k)', 'Biot Number', 'Fourier Number', 'Stanton Number'],
        ['Grübler\'s / Kutzbach criterion: M = 3(n - 1) - 2j1 - j2', 'D\'Alembert principle', 'Euler-Savary equation', 'Kennedy theorem'],
        ['Involute of a circle', 'Cycloid', 'Archimedean spiral', 'Parabolic arc'],
        ['Thrust Bearing', 'Radial Ball Bearing', 'Needle Bearing', 'Journal Bearing'],
        ['Cavitation', 'Water hammer', 'Vortex shedding', 'Surge'],
        ['Angle of wrap (Lap angle, θ)', 'Pressure angle', 'Pitch cone angle', 'Helix angle'],
        ['Dittus-Boelter Equation (Nu = 0.023 Re^0.8 Pr^n)', 'Blasius Equation', 'Churchill-Bernstein Equation', 'Colburn Analogy'],
        ['Ratio of maximum cylinder volume (bottom dead center) to clearance volume (top dead center)', 'Ratio of bore to stroke', 'Ratio of inlet pressure to exhaust pressure', 'Cut-off ratio'],
        ['Coefficient of Performance (COP)', 'Thermal Efficiency', 'Energy Efficiency Ratio (EER)', 'Carnot Factor'],
        ['Venturi meter / Orifice plate', 'Rotameter', 'Pitot-static tube', 'Hot-wire anemometer'],
        ['Biot Number (Bi = h L_c / k < 0.1)', 'Fourier Number', 'Rayleigh Number', 'Grashof Number'],
        ['Stagnation Enthalpy', 'Exergy', 'Flow Work', 'Gibbs Free Energy'],
        ['Direct shear stress and curvature effect of the spring wire coil', 'Spring surge', 'Pitch angle buckling', 'End coil inactivity'],
        ['Hartnell Governor', 'Watt Governor', 'Porter Governor', 'Proell Governor'],
        ['Curl of fluid velocity vector (∇ × V)', 'Divergence of velocity', 'Gradient of pressure', 'Laplacian of stream function'],
        ['Reduces temperature of air between stages to approximate isothermal compression and save compressor work', 'Prevents air moisture condensation', 'Increases volumetric flow', 'Eliminates stage pressure drop'],
        ['Pitch Circle', 'Base Circle', 'Addendum Circle', 'Dedendum Circle'],
        ['Compression ratio (r) and specific heat ratio (γ)', 'Maximum cylinder pressure only', 'Spark advance timing', 'Exhaust manifold backpressure'],
        ['Dynamic Balancing (two-plane balancing)', 'Static Balancing (single-plane)', 'Counterweight reciprocating balancing', 'Torsional pendulum damping'],
        ['Sublimation', 'Evaporation', 'Condensation', 'Fusion'],
        ['Critical Heat Flux (CHF) / Departure from Nucleate Boiling (DNB)', 'Leidenfrost point', 'Onset of Nucleate Boiling', 'Film condensation onset'],
        ['Geneva Drive (Maltese cross mechanism)', 'Scotch Yoke', 'Whitworth quick return', 'Peaucellier linkage'],
        ['Loss factor (tan δ) / Damping ratio (ζ)', 'Young\'s modulus', 'Poisson\'s ratio', 'Hardness Rockwell C'],
        ['Third Law of Thermodynamics (Nernst Heat Theorem)', 'Zeroth Law', 'First Law', 'Second Law'],
        ['Ratio of static enthalpy drop in rotor to total enthalpy drop in stage', 'Ratio of blade speed to steam speed', 'Flow coefficient', 'Blade loss coefficient']
      ][i] as [string, string, string, string],
      correctAnswer: 0,
      explanation: 'Fundamental theorem in core mechanical and thermal-fluid engineering.'
    }))
  ],

  'Manufacturing': [
    {
      id: 'mfg-1',
      topic: 'Manufacturing',
      question: 'In metal cutting theory, what empirical relationship correlates cutting speed V and tool life T according to F.W. Taylor?',
      options: [
        'V · Tⁿ = C',
        'Vⁿ · T = C',
        'V / Tⁿ = C',
        'V · T = Cⁿ'
      ],
      correctAnswer: 0,
      explanation: 'Taylor\'s tool life equation is V * T^n = C, where n is the tool exponent (dependent on tool material) and C is a constant cutting speed for 1-minute tool life.'
    },
    {
      id: 'mfg-2',
      topic: 'Manufacturing',
      question: 'In sand casting design, what rule states that total solidification time t_s is proportional to the square of volume-to-surface-area ratio?',
      options: ['Chvorinov\'s Rule', 'Caine\'s Method', 'Flemings Solidification Law', 'Sievert\'s Law'],
      correctAnswer: 0,
      explanation: 'Chvorinov\'s Rule states t_s = B * (V / A)^n, where n ≈ 2. Risers are sized with larger V/A ratios so they solidify after the main casting.'
    },
    {
      id: 'mfg-3',
      topic: 'Manufacturing',
      question: 'In CNC G-code programming (ISO 6983), which preparatory command generates circular interpolation in a clockwise direction?',
      options: ['G02', 'G01', 'G03', 'G00'],
      correctAnswer: 0,
      explanation: 'G00 is rapid traverse, G01 is linear interpolation, G02 is clockwise circular interpolation, and G03 is counter-clockwise circular interpolation.'
    },
    {
      id: 'mfg-4',
      topic: 'Manufacturing',
      question: 'In orthogonal metal cutting, Merchant\'s circle diagram is used to determine:',
      options: [
        'Shear force, normal force on shear plane, friction force, and normal force on tool rake face from measured cutting and thrust forces',
        'Microstructure phase transformation temperatures in pearlite',
        'Surface roughness Ra from tool nose radius',
        'Fatigue endurance limit under rotating bending'
      ],
      correctAnswer: 0,
      explanation: 'Merchant\'s circle graphically resolves measurable cutting force Fc and thrust force Ft into shear plane forces (Fs, Fn) and rake face friction forces (F, N).'
    },
    {
      id: 'mfg-5',
      topic: 'Manufacturing',
      question: 'In non-traditional manufacturing, Electrical Discharge Machining (EDM) removes conductive metal via:',
      options: [
        'High-frequency controlled thermoelectric spark erosion in a dielectric fluid medium',
        'Chemical etching with nitric acid',
        'High-velocity abrasive slurry erosion',
        'Electrochemical dissolution without spark'
      ],
      correctAnswer: 0,
      explanation: 'EDM utilizes high-frequency pulsed electrical discharges between cathode tool and anode workpiece immersed in dielectric hydrocarbon/deionized water to melt and vaporize material.'
    },
    // Adding remaining 35 Manufacturing questions
    ...Array.from({ length: 35 }, (_, i) => ({
      id: `mfg-${6 + i}`,
      topic: 'Manufacturing' as const,
      question: [
        'In sheet metal bending, what factor represents the shifted neutral axis location as a fraction of material thickness (t)?',
        'In injection molding of thermoplastics, what defect is caused by premature solidification of molten polymer flow fronts before merging?',
        'Which welding process utilizes a non-consumable tungsten electrode shielded by inert argon gas?',
        'In powder metallurgy, what thermal consolidation process heats compacted powder briquettes below melting point to bond particles by atomic diffusion?',
        'What G-code command activates cutter radius compensation to the left of the programmed path?',
        'In cylindrical grinding, what parameter describes the ratio of wheel peripheral speed to workpiece peripheral speed?',
        'Which nondestructive testing (NDT) method is exclusively applicable to ferromagnetic materials for detecting surface and near-surface cracks?',
        'In rolling mills, what is the maximum draft (Δh_max) in a single pass dependent upon?',
        'What type of chip formation in metal turning is preferred for automated machining and operator safety?',
        'In arc welding, what shielding gas is standardly utilized in Gas Metal Arc Welding (GMAW / MIG) for carbon steel to prevent porosity while stabilizing the arc?',
        'In deep drawing of cylindrical cups, what defect manifests as wavy ruffling around the circular flange caused by circumferential compressive hoop stresses?',
        'What is the function of draft angles added to vertical surfaces of patterns in sand casting and dies in forging?',
        'In metal extrusion, what angle of the die opening balances redundant work against frictional work to minimize extrusion pressure?',
        'Which advanced machining process uses magnetostrictive transducers vibrating at 20 kHz to drive abrasive slurry against brittle materials?',
        'In Coordinate Measuring Machines (CMM), what compensation is applied to account for the physical radius of the spherical ruby stylus tip?',
        'What casting process produces extremely dense, defect-free hollow pipes by rotating the cylindrical mold at high speeds during pouring?',
        'In heat treatment of medium carbon steels, what rapid cooling process transforms austenite directly into hard, brittle martensite?',
        'What tempering temperature range is applied to relieve internal stresses while retaining maximum hardness in quenched alloy tool steels?',
        'In machining economics, how does tool life for minimum production cost compare to tool life for maximum production rate?',
        'Which additive manufacturing method uses a galvanometer-steered laser to melt metal powder bed layers iteratively (PBF-LB)?',
        'In metal stamping, what is the clearance between punch and die typically specified as for blanking mild steel?',
        'What surface roughness parameter Ra represents the arithmetic average of absolute profile height deviations from the mean line?',
        'In electrochemical machining (ECM), what law governs the mass of metal dissolved from the workpiece anode?',
        'What type of welding defect occurs when weld metal fails to fuse completely into the root of the joint?',
        'In forging, what thin excess metal channel is designed into impression dies to force metal into intricate cavity corners before being trimmed?',
        'What is the function of cutting fluid (coolant) during heavy metal roughing cuts with cemented carbide inserts?',
        'In abrasive waterjet machining (AWJM), what hard mineral abrasive is entrained into the supersonic water stream?',
        'Which manufacturing process produces seamless gas cylinders and automotive driveshafts from flat circular discs without chips?',
        'What type of tolerance specification establishes independent upper and lower limits on a single dimension (e.g. 25.00 ± 0.05 mm)?',
        'In CNC machining centers, what M-code stops spindle rotation and turns off coolant at the end of a program cycle?',
        'What is the primary cause of crater wear on the rake face of a high-speed steel cutting tool?',
        'In metal casting, what device placed inside the mold cavity cools heavy sections rapidly to promote directional solidification toward risers?',
        'What process uses diamond or CBN stones reciprocating in a bore to produce a cross-hatch pattern with sub-micron dimensional tolerance?',
        'In plastic extrusion, what component of the single-screw extruder homogenizes and pumps molten polymer forward against die head pressure?',
        'What quality control chart tracks the number of defective units in samples of constant size n?'
      ][i],
      options: [
        ['K-Factor', 'Springback ratio', 'Poisson ratio', 'Drawability ratio'],
        ['Weld Line (Knit Line)', 'Flash', 'Sink Mark', 'Short Shot'],
        ['Gas Tungsten Arc Welding (GTAW / TIG)', 'Shielded Metal Arc Welding (SMAW)', 'Submerged Arc Welding (SAW)', 'Oxy-Acetylene Welding'],
        ['Sintering', 'Atomization', 'Cold Isostatic Pressing', 'Green Briquetting'],
        ['G41 (Cutter Compensation Left)', 'G42 (Cutter Compensation Right)', 'G40 (Compensation Cancel)', 'G43 (Tool Length Compensation)'],
        ['Speed ratio (q = v_s / v_w)', 'Infeed rate', 'Equivalent grinding diameter', 'G-ratio'],
        ['Magnetic Particle Testing (MPT)', 'Liquid Penetrant Testing (PT)', 'Radiographic Testing (RT)', 'Ultrasonic Testing (UT)'],
        ['Coefficient of friction squared multiplied by roll radius: Δh_max = μ² · R', 'Roll speed', 'Motor horsepower', 'Length of contact arc'],
        ['Discontinuous chips with chip breakers (short C-shaped chips)', 'Continuous ribbon chips wrapping around chuck', 'Built-up edge continuous chips', 'Serrated shear localized chips'],
        ['Argon + CO2 mixture (e.g. 75% Ar / 25% CO2)', 'Pure Hydrogen', 'Pure Nitrogen', 'Carbon monoxide'],
        ['Flange Wrinkling', 'Ears (Earing)', 'Orange peel effect', 'Tearing at cup bottom'],
        ['Facilitates easy removal of pattern or forged component from mold without damaging sidewalls', 'Improves surface hardness', 'Increases thermal conductivity', 'Prevents oxidation'],
        ['Optimum Die Angle (semi-cone angle)', 'Zero die angle', '90-degree flat die', 'Negative rake die'],
        ['Ultrasonic Machining (USM)', 'Laser Beam Machining', 'Wire EDM', 'Chemical Milling'],
        ['Tip Radius Compensation (Probe Radius Correction)', 'Cosine error calibration', 'Temperature thermal expansion scale', 'Parallax offset'],
        ['True Centrifugal Casting', 'Investment Casting', 'Die Casting', 'Shell Mold Casting'],
        ['Quenching (in water, brine, or oil)', 'Full Annealing', 'Normalizing', 'Spheroidizing'],
        ['150°C to 250°C (Low-temperature tempering)', '500°C to 650°C', '850°C to 900°C', 'Above A1 critical temperature'],
        ['Tool life for minimum cost is always longer than tool life for maximum production rate', 'Tool life for minimum cost is shorter', 'Both tool lives are identical', 'Cost tool life is zero'],
        ['Direct Metal Laser Sintering (DMLS) / Selective Laser Melting (SLM)', 'Fused Deposition Modeling (FDM)', 'Stereolithography (SLA)', 'Laminated Object Manufacturing'],
        ['5% to 8% of sheet thickness per side (t)', '50% of sheet thickness', '0.01% of sheet thickness', '25% of sheet thickness'],
        ['Center Line Average (Ra = (1/L) ∫ |y| dx)', 'Root Mean Square (Rq)', 'Ten-point height (Rz)', 'Maximum peak-to-valley height (Rt)'],
        ['Faraday\'s Laws of Electrolysis', 'Ohm\'s Law', 'Coulomb\'s Law', 'Ampere\'s Circuital Law'],
        ['Lack of Fusion / Incomplete Penetration', 'Porosity', 'Spatter', 'Undercut'],
        ['Flash Gutter', 'Sprue well', 'Parting line draft', 'Knockout pin'],
        ['Cooling the tool-chip interface, lubricating tool rake/flank faces, and flushing chips away', 'Increasing tool hardness', 'Inducing martensite in chip', 'Eliminating machine tool vibrations'],
        ['Garnet', 'Silicon carbide grit #60', 'Diamond dust', 'Quartz sand'],
        ['Flow Forming / Metal Spinning', 'Drop Forging', 'Sand Casting', 'Broaching'],
        ['Bilateral Tolerance', 'Unilateral Tolerance', 'Limit Dimensioning', 'Geometric Dimensioning'],
        ['M05 (Spindle Stop) and M09 (Coolant Off)', 'M03 (Spindle On CW)', 'M08 (Coolant On)', 'M00 (Program Stop)'],
        ['Solid-state chemical diffusion of atoms between chip and tool rake face under high temperature', 'Mechanical abrasion at low speed', 'Oxidation from coolant', 'Micro-chipping by inclusions'],
        ['Internal and External Chills', 'Core prints', 'Chaplets', 'Exothermic sleeves'],
        ['Honing', 'Lapping', 'Burnishing', 'Buffing'],
        ['Metering Section', 'Feed Section', 'Transition (Compression) Section', 'Breaker plate'],
        ['np-Chart (or p-Chart)', 'X-bar and R Chart', 'c-Chart', 'u-Chart']
      ][i] as [string, string, string, string],
      correctAnswer: 0,
      explanation: 'Core industrial manufacturing engineering standard and machining science.'
    }))
  ],

  'Strength of materials': [
    {
      id: 'som-1',
      topic: 'Strength of materials',
      question: 'In a general 2D state of plane stress, the maximum in-plane shear stress $\\tau_{max}$ on Mohr\'s circle is given by:',
      options: [
        'τ_max = √[ ((σ_x - σ_y)/2)² + τ_xy² ]',
        'τ_max = (σ_x + σ_y) / 2',
        'τ_max = √[ (σ_x + σ_y)² + τ_xy² ]',
        'τ_max = (σ_x - σ_y) / 2'
      ],
      correctAnswer: 0,
      explanation: 'The radius of Mohr\'s circle represents the maximum in-plane shear stress: R = τ_max = sqrt(((σx - σy)/2)^2 + τxy^2).'
    },
    {
      id: 'som-2',
      topic: 'Strength of materials',
      question: 'Euler\'s critical buckling load $P_{cr}$ for an ideal slender column of length L, Young\'s modulus E, second moment of area I, with both ends pinned is:',
      options: [
        'P_cr = (π² · E · I) / L²',
        'P_cr = (4 · π² · E · I) / L²',
        'P_cr = (π² · E · I) / (4 · L²)',
        'P_cr = (2 · π² · E · I) / L²'
      ],
      correctAnswer: 0,
      explanation: 'For a pinned-pinned column, effective length Le = L, giving Euler\'s buckling load P_cr = (π^2 * E * I) / L^2.'
    },
    {
      id: 'som-3',
      topic: 'Strength of materials',
      question: 'What is the governing elastic torsion equation for a circular shaft subjected to twisting torque T?',
      options: [
        'T / J = τ / r = G · θ / L',
        'T / I = σ / y = E / R',
        'T · J = τ · r = G · θ · L',
        'T / r = τ / J = G · L / θ'
      ],
      correctAnswer: 0,
      explanation: 'The torsion formula relates twisting moment T, polar moment of inertia J, shear stress τ at radius r, shear modulus G, angle of twist θ, and length L.'
    },
    {
      id: 'som-4',
      topic: 'Strength of materials',
      question: 'In pure bending of a straight prismatic beam (Euler-Bernoulli beam theory), what is the relationship between bending moment M, moment of inertia I, bending stress $\\sigma$, and radius of curvature R?',
      options: [
        'M / I = σ / y = E / R',
        'M / y = σ / I = R / E',
        'M · I = σ · y = E · R',
        'M / E = σ / R = I / y'
      ],
      correctAnswer: 0,
      explanation: 'The flexure formula states M / I = σ / y = E / R, where y is the distance from the neutral axis and E is Young\'s modulus.'
    },
    {
      id: 'som-5',
      topic: 'Strength of materials',
      question: 'Under the Von Mises yield criterion (maximum distortion energy theory), yielding in a ductile material initiates when:',
      options: [
        'The distortion strain energy per unit volume reaches the distortion energy at yield in simple uniaxial tension',
        'The maximum principal stress equals uniaxial tensile yield strength',
        'The maximum shear stress reaches half the tensile yield strength',
        'Total strain energy equals rupture strain'
      ],
      correctAnswer: 0,
      explanation: 'Von Mises criterion states yielding occurs when octahedral shear stress / distortion energy reaches the yield point: (σ1-σ2)^2 + (σ2-σ3)^2 + (σ3-σ1)^2 = 2 * σy^2.'
    },
    // Adding remaining 35 Strength of Materials questions
    ...Array.from({ length: 35 }, (_, i) => ({
      id: `som-${6 + i}`,
      topic: 'Strength of materials' as const,
      question: [
        'What is the relationship between Young\'s Modulus (E), Shear Modulus (G), and Poisson\'s Ratio (ν) for a linear isotropic elastic material?',
        'What is the relationship between Young\'s Modulus (E), Bulk Modulus (K), and Poisson\'s Ratio (ν)?',
        'In a thin-walled cylindrical pressure vessel of internal diameter d, wall thickness t, subjected to internal gauge pressure p, what is the circumferential (hoop) stress $\\sigma_h$?',
        'In the same thin-walled cylindrical pressure vessel, what is the longitudinal stress $\\sigma_l$?',
        'What is the ratio of hoop stress to longitudinal stress in a thin cylindrical pressure vessel subjected to internal pressure?',
        'For an ideal thin spherical pressure vessel of diameter d, thickness t, and internal pressure p, what is the stress in the wall in any tangential direction?',
        'According to Castigliano\'s second theorem, the partial derivative of total strain energy U with respect to an applied point load P equals:',
        'What is the deflection at the free end of a cantilever beam of length L, flexural rigidity EI, subjected to a concentrated point load P at the tip?',
        'What is the maximum bending moment in a simply supported beam of length L subjected to a uniformly distributed load w across its entire span?',
        'What is the maximum deflection at the midspan of the same simply supported beam with uniformly distributed load w?',
        'In a beam of rectangular cross-section (width b, depth h), what is the ratio of maximum shear stress $\\tau_{max}$ at the neutral axis to average shear stress $\\tau_{avg}$?',
        'In a solid circular cross-section beam of diameter d, what is the ratio of maximum shear stress to average shear stress?',
        'What is the Slenderness Ratio (λ) of a structural compression column defined as?',
        'For a column with one end fixed and the other end completely free, what is the effective length $L_e$ in terms of actual length L?',
        'For a column with both ends rigidly fixed, what is the effective length $L_e$?',
        'What does the area under the engineering stress-strain curve up to the fracture point represent?',
        'What does the area under the engineering stress-strain curve up to the proportional elastic limit represent?',
        'What theorem states that the deflection at point A due to a unit load at point B is equal to the deflection at point B due to a unit load at point A?',
        'In a shaft subjected to combined bending moment M and twisting moment T, what is the equivalent twisting moment $T_e$ according to Guest\'s (maximum shear stress) theory?',
        'In the same shaft under combined M and T, what is the equivalent bending moment $M_e$ according to Rankine\'s (maximum principal stress) theory?',
        'What is the polar moment of inertia J of a solid circular shaft of diameter d?',
        'Where is the shear center located in an open thin-walled channel section (C-channel)?',
        'What is the volumetric strain $\\epsilon_v$ of an isotropic cube subjected to triaxial stresses $\\sigma_x, \\sigma_y, \\sigma_z$?',
        'In thick-walled cylinders subjected to internal pressure $p_i$, which equations describe the radial and hoop stress distribution across cylinder wall radius r?',
        'What is the maximum theoretical value of Poisson\'s ratio $\\nu$ for an incompressible isotropic material?',
        'What type of beam is supported on more than two supports, making it statically indeterminate?',
        'In a beam subjected to pure bending, where does the neutral axis pass through on the cross-section?',
        'What is the strain energy stored in a linear elastic bar of length L, cross-sectional area A, under axial load P?',
        'What failure theory is most conservative and suitable for predicting yielding in brittle materials (such as cast iron)?',
        'When an axially constrained bar of length L and thermal expansion coefficient $\\alpha$ is heated by temperature rise $\\Delta T$, what thermal stress $\\sigma_{th}$ develops?',
        'What is the shape of the bending moment diagram for a simply supported beam carrying only a central concentrated load?',
        'At a point of contraflexure (inflection point) along a loaded beam, what is the value of the bending moment?',
        'What is the section modulus Z of a solid circular shaft of diameter d?',
        'In flitched beams consisting of wood reinforced with steel plates, what factor transforms the steel width into equivalent wood width?',
        'What is the shear stress at the extreme outer fibers (top and bottom surfaces) of a beam subjected to transverse shear loading?'
      ][i],
      options: [
        ['E = 2G(1 + ν)', 'E = G(1 + 2ν)', 'E = 2G(1 - ν)', 'E = G / (2(1 + ν))'],
        ['E = 3K(1 - 2ν)', 'E = 3K(1 + 2ν)', 'E = K(1 - 2ν)', 'E = 2K(1 - 3ν)'],
        ['σ_h = (p · d) / (2 · t)', 'σ_h = (p · d) / (4 · t)', 'σ_h = (p · d) / t', 'σ_h = (2 · p · d) / t'],
        ['σ_l = (p · d) / (4 · t)', 'σ_l = (p · d) / (2 · t)', 'σ_l = (p · d) / t', 'σ_l = (p · d) / (8 · t)'],
        ['2 : 1 (Hoop stress is twice the longitudinal stress)', '1 : 1', '1 : 2', '4 : 1'],
        ['σ = (p · d) / (4 · t)', 'σ = (p · d) / (2 · t)', 'σ = (p · d) / t', 'σ = (p · d) / (8 · t)'],
        ['Deflection δ at the point of application and in the direction of load P', 'Bending moment at fixed end', 'Rotation angle squared', 'Total work done'],
        ['δ = (P · L³) / (3 · E · I)', 'δ = (P · L³) / (8 · E · I)', 'δ = (P · L³) / (48 · E · I)', 'δ = (P · L⁴) / (8 · E · I)'],
        ['M_max = (w · L²) / 8', 'M_max = (w · L²) / 4', 'M_max = (w · L²) / 12', 'M_max = (w · L) / 8'],
        ['δ_max = (5 · w · L⁴) / (384 · E · I)', 'δ_max = (w · L⁴) / (48 · E · I)', 'δ_max = (w · L³) / (48 · E · I)', 'δ_max = (w · L⁴) / (384 · E · I)'],
        ['τ_max = 1.5 · τ_avg (3/2 ratio)', 'τ_max = 1.33 · τ_avg', 'τ_max = 2.0 · τ_avg', 'τ_max = 1.0 · τ_avg'],
        ['τ_max = 4/3 · τ_avg (1.33 ratio)', 'τ_max = 1.5 · τ_avg', 'τ_max = 2.0 · τ_avg', 'τ_max = 1.2 · τ_avg'],
        ['Ratio of effective length to minimum radius of gyration (λ = L_e / k_min)', 'Ratio of column length to diameter', 'Ratio of axial load to area', 'Ratio of width to depth'],
        ['L_e = 2 · L', 'L_e = 0.5 · L', 'L_e = 0.7 · L', 'L_e = L'],
        ['L_e = 0.5 · L (or L / 2)', 'L_e = 2 · L', 'L_e = 0.7 · L', 'L_e = L'],
        ['Modulus of Toughness', 'Modulus of Resilience', 'Yield Strength', 'Hardness'],
        ['Modulus of Resilience', 'Modulus of Toughness', 'Ultimate Tensile Strength', 'Tangent Modulus'],
        ['Maxwell-Betti Reciprocal Deflection Theorem', 'Castigliano\'s Theorem', 'Mohr\'s Area-Moment Theorem', 'Clapeyron\'s Theorem of Three Moments'],
        ['T_e = √(M² + T²)', 'T_e = M + √(M² + T²)', 'T_e = 0.5 · [M + √(M² + T²)]', 'T_e = M + T'],
        ['M_e = 0.5 · [M + √(M² + T²)]', 'M_e = √(M² + T²)', 'M_e = M + √(M² + T²)', 'M_e = 0.5 · [M + T]'],
        ['J = (π · d⁴) / 32', 'J = (π · d⁴) / 64', 'J = (π · d³) / 16', 'J = (π · d⁴) / 16'],
        ['Outside the web on the side opposite the flanges (outside the channel profile)', 'At the centroid of the cross section', 'At the midpoint of the web', 'At the tip of the upper flange'],
        ['ε_v = [(σ_x + σ_y + σ_z) / E] · (1 - 2ν)', 'ε_v = (σ_x + σ_y + σ_z) / E', 'ε_v = (σ_x + σ_y + σ_z) / 3K', 'ε_v = 0'],
        ['Lamé\'s Equations (σ_r = A - B/r², σ_θ = A + B/r²)', 'Euler equations', 'Navier equations', 'Saint-Venant equations'],
        ['ν = 0.5 (Bulk modulus K approaches infinity)', 'ν = 0.25', 'ν = 1.0', 'ν = 0.33'],
        ['Continuous Beam', 'Cantilever Beam', 'Overhanging Beam', 'Propped Cantilever'],
        ['Centroid of the cross-sectional area', 'Extreme bottom fiber', 'Extreme top fiber', 'Shear center'],
        ['U = (P² · L) / (2 · A · E)', 'U = (P · L) / (A · E)', 'U = (P² · L²) / (2 · E · I)', 'U = (P · L) / (2 · A)'],
        ['Maximum Normal Stress Theory (Rankine\'s Theory) / Mohr-Coulomb Theory', 'Tresca Theory', 'Von Mises Theory', 'Maximum Strain Theory'],
        ['σ_th = E · α · ΔT (compressive for temperature rise)', 'σ_th = α · ΔT / E', 'σ_th = E / (α · ΔT)', 'σ_th = 0'],
        ['Triangular', 'Parabolic', 'Cubic', 'Rectangular'],
        ['Zero (Bending moment changes sign at point of contraflexure)', 'Maximum positive', 'Maximum negative', 'Infinity'],
        ['Z = (π · d³) / 32', 'Z = (π · d³) / 64', 'Z = (π · d⁴) / 32', 'Z = (π · d³) / 16'],
        ['Modular ratio m = E_steel / E_wood', 'm = G_steel / G_wood', 'm = Poisson ratio ratio', 'm = Density ratio'],
        ['Zero (Shear stress is zero at free top and bottom boundaries)', 'Maximum', 'Average shear stress', 'Half of maximum']
      ][i] as [string, string, string, string],
      correctAnswer: 0,
      explanation: 'Foundational strength of materials and continuum solid mechanics derivation.'
    }))
  ]
};
