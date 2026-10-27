/** BLACKLINE 0.4.0 — procedural game-audio engine. */
export as namespace Blackline;
export type Vec3 = [number, number, number];
export type BuiltinWeaponId = 'g17'|'g19'|'g26'|'g34'|'g43x'|'beretta92'|'p226'|'colt1911'|'sw686'|'luger'|'mp5'|'m4a1'|'akm'|'g36'|'p90'|'thompson'|'garand'|'mossberg590'|'barrett82';
export type WeaponId = BuiltinWeaponId | (string & {});
export type EnvironmentId = 'field'|'forest'|'range'|'hall'|'concrete'|'tunnel'|'alley'|'valley'|'dry';
export type Layer = 'transient'|'texture'|'body'|'gas'|'mechanical'|'casing';
export type Surface = 'grass'|'gravel'|'concrete'|'wood'|'metal';
export type ActionName = 'triggerPress'|'triggerBreak'|'triggerRelease'|'triggerReset'|'dryFire'|'boltBack'|'boltForward'|'spring'|'magRelease'|'magOut'|'magIn'|'magSeat'|'safety'|'selector'|'pumpBack'|'pumpForward'|'casingImpact'|'hammerCock'|'cylinderOpen'|'cylinderClose'|'clip'|'cycle';
export type EventKind = 'shot'|'mechanics'|'action';
export type DistanceModel = 'inverse'|'game'|'none';
export interface SynthOptions {
 transient?:number; texture?:number; body?:number; gas?:number; mechanical?:number; casing?:number;
 brightness?:number; variation?:number; cycle?:number; metalness?:number; trigger?:number; bolt?:number; spring?:number; return?:number;
 frontDuration?:number; frontShape?:number; textureDecay?:number; bodyBandwidth?:number; bodyDecay?:number; gasDecay?:number;
 surface?:Surface; solo?:Layer|null; mute?:Layer[];
}
export interface EQBand { frequency?:number; Q?:number; gain?:number; enabled?:boolean; }
export interface EQOptions { enabled?:boolean; position?:'pre'|'post'; hp?:EQBand; lp?:EQBand; lowShelf?:EQBand; bell1?:EQBand; bell2?:EQBand; highShelf?:EQBand; }
export interface SaturationOptions { enabled?:boolean; mode?:'soft'|'hard'; inputDB?:number; driveDB?:number; outputDB?:number; wet?:number; oversample?:1|4; }
export interface CompressorOptions { enabled?:boolean; threshold?:number; ratio?:number; knee?:number; attackMS?:number; releaseMS?:number; makeupDB?:number; }
export interface ChainOptions { eq?:EQOptions; saturation?:SaturationOptions; compressor?:CompressorOptions; }
export interface EffectsOptions { layers?:Partial<Record<Layer,ChainOptions>>; }
export type EffectsInput = EffectsOptions|string;
export interface MixerLayer { gain?:number; mute?:boolean; solo?:boolean; direct?:number; room?:number; }
export type MixerOptions = Partial<Record<Layer,MixerLayer>>;
export interface SuppressorOptions { enabled?:boolean; amount?:number; tone?:number; }
export interface LimiterOptions { ceilingDB?:number; releaseMS?:number; lookaheadMS?:number; }
export interface ActionOptions { intensity?:number; material?:'mixed'|'metal'|'polymer'|'wood'; resonance?:number; damping?:number; friction?:number; bounces?:number; surface?:Surface; }
export interface RoomOptions { rt?:number; wet?:number; early?:number; damping?:number; size?:number; width?:number; }
export interface ListenerOptions { position?:Vec3; forward?:Vec3; up?:Vec3; }
export interface SourceReference { title:string; url:string; }
export interface AudioDesign { family:string; frontMS:number; edge:number; body:number; tail:number; mechanism:string; }
export interface ProfileMetadata { id:WeaponId; name:string; shortName?:string; category?:string; caliber?:string; action?:string; lengthMM?:number|null; barrelMM?:number|null; heightMM?:number|null; widthMM?:number|null; massG?:number|null; massNote?:string; capacity?:number|string|null; automatic?:boolean; rpm?:number|null; rpmNote?:string; description?:string; dimensionNote?:string; audioNote?:string; sources?:SourceReference[]; checked?:string; visualLength?:number; visualHeight?:number; }
export interface Weapon extends Readonly<ProfileMetadata> { readonly shortName:string; readonly automatic:boolean; readonly rpm:number|null; readonly audio:Readonly<AudioDesign>; }
export interface Environment extends Required<RoomOptions> { readonly id?:EnvironmentId; readonly name:string; readonly subtitle:string; readonly description:string; readonly paths:readonly (readonly [number,number,number])[]; }
export interface Capabilities { actions:ActionName[]; automatic:boolean; suppressor:true; suppressorMode:'game-audio'; spring:boolean; bolt:boolean; magazine:boolean; }
export interface Measurement { peak:number; rms:number; peakDB:number; rmsDB:number; crestDB:number; clipped:number; samples:number; }
export interface LimiterMeter { prePeak:number; postPeak:number; preEnergy:number; postEnergy:number; samples:number; preRMS:number; postRMS:number; crestDB:number; maxReductionDB:number; currentReductionDB:number; overCeiling:number; }
export interface EventRequest { weapon?:WeaponId; kind?:EventKind; action?:ActionName; sampleRate?:number; seed?:number; synth?:SynthOptions; effects?:EffectsInput; mixer?:MixerOptions; suppressor?:SuppressorOptions|boolean; actionOptions?:ActionOptions; debugStems?:boolean; includeCasing?:boolean; includeMechanics?:boolean; legacyTrigger?:boolean; }
export interface PCMResult {
 pcm:Float32Array; stems:Partial<Record<Layer,Float32Array>>;
 rawStems?:Partial<Record<Layer,Float32Array>>; weightedStems?:Partial<Record<Layer,Float32Array>>;
 /** Compatibility alias for rawStems; present only with debugStems. */
 layers?:Partial<Record<Layer,Float32Array>>;
 sampleRate:number; seed:number; weapon:WeaponId; kind:EventKind; action:ActionName|null;
 peak:number; rms:number; duration:number; metrics:Measurement;
 layerMetrics:Partial<Record<Layer,Measurement & {compressorReductionDB:number}>>;
 timeline:Array<{layer:Layer;action:string;at:number;type:string}>;
 options:Required<SynthOptions>; resolved:EventRequest;
 allocatedBytesEstimate:number; retainedBytes:number;
}
export interface EngineOptions { context?:AudioContext|OfflineAudioContext; destination?:AudioNode|null; masterGain?:number; maxVoices?:number; speedOfSound?:number; limiter?:LimiterOptions; worker?:boolean; }
export interface EmitterOptions { id?:string; weapon?:WeaponId; position?:Vec3; synth?:SynthOptions; effects?:EffectsInput; mixer?:MixerOptions; suppressor?:SuppressorOptions|boolean; gain?:number; priority?:number; occlusion?:number; distanceModel?:DistanceModel; rolloff?:number; propagation?:boolean; panningModel?:'HRTF'|'equalpower'; perspective?:'world'|'firstPerson'; firstPersonOffset?:Vec3; environment?:EnvironmentId; room?:RoomOptions; tailMode?:'crossfade'|'natural'; }
export interface EmitterSnapshot extends Omit<EmitterOptions,'id'> {}
export interface SceneSnapshot { schema:'blackline.scene.v2'; version:string; engine:{maxVoices:number; speedOfSound:number; limiter:Required<LimiterOptions>; worker:boolean}; listener:Required<ListenerOptions>; masterGain:number; emitters:(EmitterSnapshot & {id:string})[]; }
export interface PlayOptions extends Omit<EventRequest,'weapon'|'sampleRate'> { when?:number; gain?:number; priority?:number; position?:Vec3; follow?:boolean; latePolicy?:'play'|'drop'; signal?:AbortSignal; }
export interface PreparedEvent { data:PCMResult; synthMS:number; }
export interface EventHandle { id:string; when:number; scheduledAt:number; audioStart:number; estimatedArrival:number; sourceEnd:number; estimatedTailEnd:number; seed:number; duration:number; weapon:WeaponId; kind:EventKind; action:ActionName|null; source?:AudioBufferSourceNode; gainNode?:GainNode; sources:AudioBufferSourceNode[]; gainNodes:GainNode[]; data:PCMResult; synthMS:number; priority:number; stopped:boolean; stopping:boolean; detached?:boolean; emitter:Emitter; positionAtStart:Vec3; renderSnapshot:RenderOptions; readonly state:'scheduled'|'active'|'tail'|'ended'; stop(options?:{immediate?:boolean}):void; }
export type ShotHandle = EventHandle;
export type ShotOptions = PlayOptions;
export interface AutomaticOptions { rpm?:number; count?:number; seed?:number; worker?:boolean; triggerCues?:boolean; }
export interface SequenceOptions { intervalMS?:number; count?:number; seed?:number; worker?:boolean; }
export interface SequenceHandle { stop():Emitter; setRate(rpm:number):void; readonly active:boolean; }
export interface TimelineEntry { id:string; emitter:string; weapon:WeaponId; kind:EventKind; action:ActionName|null; seed:number; scheduledAt:number; audioStart:number; estimatedArrival:number; sourceEnd:number; estimatedTailEnd:number; }
export interface EngineStats { events:number; shots:number; actions:number; lastSynthMS:number; maxSynthMS:number; voices:number; scheduled:number; active:number; tails:number; emitters:number; sampleRate:number; state:AudioContextState; lateDropped:number; stolen:number; backend:string; worker:boolean; workerQueue:number; latencySeconds:number; irBuilds:number; irHits:number; irCached:number; limiter:Partial<LimiterMeter>; limiterTotals:{prePeak:number;postPeak:number;maxReductionDB:number;overCeiling:number}; }
export class Engine {
 constructor(options?:EngineOptions);
 readonly context:AudioContext|OfflineAudioContext; readonly emitters:Map<string,Emitter>;
 readonly input:GainNode; readonly output:GainNode; readonly master:GainNode; readonly analyser:AnalyserNode;
 readonly hp:BiquadFilterNode; readonly limiter:AudioNode; readonly listener:Required<ListenerOptions>;
 readonly activeVoices:number; readonly currentTime:number; readonly stats:EngineStats; readonly timeline:TimelineEntry[];
 readonly backend:string; readonly latencySeconds:number; readonly maxVoices:number; readonly speedOfSound:number; readonly masterGain:number;
 resume():Promise<this>; suspend():Promise<this>; dispose():Promise<void>;
 createEmitter(options?:EmitterOptions):Emitter;
 setListener(patch:ListenerOptions):this; setMasterGain(value:number):this; setMaxVoices(value:number):this;
 setSpeedOfSound(value:number):this; setLimiter(patch:LimiterOptions):this; setWorkerEnabled(value:boolean):this;
 prepareEvent(request:EventRequest,options?:{signal?:AbortSignal}):Promise<PCMResult>;
 stopAll(options?:{tails?:boolean;immediate?:boolean}):this; emergencyStop():this;
 snapshot():SceneSnapshot; loadSnapshot(snapshot:unknown,options?:{allowMonitorIncrease?:boolean}):this;
 on(name:'shot'|'action'|'event',callback:(event:{emitter:Emitter;handle:EventHandle})=>void):()=>this;
 on(name:'meter',callback:(meter:LimiterMeter)=>void):()=>this;
 on(name:'error',callback:(error:Error)=>void):()=>this;
 on(name:'backendfallback',callback:(event:{backend:string;reason:string})=>void):()=>this;
 off(name:string,callback:Function):this;
}
export class Emitter {
 constructor(engine:Engine,options?:EmitterOptions);
 readonly id:string; readonly engine:Engine; readonly context:AudioContext|OfflineAudioContext;
 readonly input:GainNode; readonly roomInput:GainNode; readonly panner:PannerNode; readonly air:BiquadFilterNode; readonly distanceGain:GainNode; readonly roomFeed:GainNode;
 readonly voices:Map<string,EventHandle>; readonly distance:number; readonly azimuth:number;
 readonly position:Vec3; readonly weapon:WeaponId; readonly synth:Required<SynthOptions>;
 setPosition(value:Vec3):this; setPosition(x:number,y:number,z:number):this;
 setDistance(distance:number,azimuthRadians?:number,elevationRadians?:number):this;
 setGain(value:number):this; setOcclusion(value:number):this;
 setDistanceModel(model:DistanceModel,rolloff?:number):this;
 setPanningModel(model:'HRTF'|'equalpower'):this; setPerspective(mode:'world'|'firstPerson',offset?:Vec3):this;
 setSynth(patch:SynthOptions):this; setEffects(patch:EffectsInput):this; setLayerEffects(layer:Layer,patch:ChainOptions):this;
 setMixer(patch:MixerOptions):this; setSuppressor(value:boolean|SuppressorOptions):this;
 setWeapon(id:WeaponId):this; getCapabilities():Capabilities;
 setEnvironment(id:EnvironmentId,overrides?:RoomOptions,options?:{tailMode?:'crossfade'|'natural'}):this;
 update(patch:EmitterOptions):this;
 fire(options?:PlayOptions):EventHandle|null;
 playAction(name:ActionName,options?:PlayOptions):EventHandle|null;
 mechanics(options?:PlayOptions):EventHandle|null;
 prepare(options?:PlayOptions):Promise<PreparedEvent>;
 fireAsync(options?:PlayOptions):Promise<EventHandle|null>;
 playPrepared(prepared:PreparedEvent,options?:PlayOptions):EventHandle|null;
 startAutomatic(options?:AutomaticOptions):SequenceHandle; startSequence(options?:SequenceOptions):SequenceHandle;
 stopAutomatic(options?:{release?:boolean}):this; stop(options?:{immediate?:boolean}):this; silence():this;
 snapshot():EmitterSnapshot; dispose():void;
 on(name:'event'|'shot'|'action'|'ended',callback:(handle:EventHandle)=>void):()=>this;
 on(name:'sequenceend',callback:(event:{count:number})=>void):()=>this;
 off(name:string,callback:Function):this;
}
export interface AudioBufferLike { readonly numberOfChannels:number; readonly length:number; readonly sampleRate:number; readonly duration:number; getChannelData(channel:number):Float32Array; }
export class PCMBuffer implements AudioBufferLike { constructor(channels:Float32Array[],sampleRate:number); readonly numberOfChannels:number; readonly length:number; readonly sampleRate:number; readonly duration:number; getChannelData(channel:number):Float32Array; copyFromChannel(destination:Float32Array,channel:number,offset?:number):void; }
export type RenderStage = 'scene'|'dry'|'wet'|'source'|`raw:${Layer}`|`weighted:${Layer}`|`stem:${Layer}`;
export interface RenderOptions extends EventRequest, Omit<EmitterOptions,'weapon'|'synth'|'effects'|'mixer'|'suppressor'> { at?:number; stage?:RenderStage; masterGain?:number; listener?:ListenerOptions; speedOfSound?:number; limiter?:LimiterOptions; eventGain?:number; signal?:AbortSignal; }
export interface RenderResult { buffer:PCMBuffer; event:PCMResult; events?:PCMResult[]; metrics:Measurement|LimiterMeter; outputMetrics?:Measurement; metadata:Record<string,unknown>; }
export function synthesize(id?:WeaponId,options?:SynthOptions,sampleRate?:number,seed?:number,kind?:EventKind,processing?:Omit<EventRequest,'weapon'|'synth'|'sampleRate'|'seed'|'kind'>):PCMResult;
export function synthesizeEvent(request?:EventRequest):PCMResult;
export function resolveEvent(request?:EventRequest):EventRequest;
export function capabilities(id:WeaponId):Capabilities;
export function registerProfile(metadata:ProfileMetadata,audio:AudioDesign):Weapon;
export function registerPreset(id:string,effects:EffectsInput):EffectsOptions;
export function renderShot(options?:RenderOptions):Promise<RenderResult>;
export function renderSequence(events:(RenderOptions & {at:number})[],options?:RenderOptions):Promise<RenderResult>;
export function encodeWAV(buffer:AudioBufferLike,options?:{format?:'pcm16'|'float32';dither?:boolean;seed?:number;metadata?:unknown}):ArrayBuffer;
export function measure(channels:Float32Array|Float32Array[]):Measurement;
export function processChain(pcm:Float32Array,settings:ChainOptions,sampleRate:number):{pcm:Float32Array;reductionDB:number;latencySamples:number};
export class LinkedPeakLimiter { constructor(sampleRate:number,options:Required<LimiterOptions>); configure(options:Partial<LimiterOptions>):void; process(input:Float32Array[],output:Float32Array[]):Float32Array[]; readMeter(reset?:boolean):LimiterMeter; resetMeter():void; readonly lookahead:number; }
export function limitPCM(channels:Float32Array[],sampleRate:number,options?:LimiterOptions):{channels:Float32Array[];metrics:LimiterMeter;latencySamples:number};
export function effectsOptions(options?:EffectsInput):{layers:Record<Layer,ChainOptions>};
export function mixerOptions(options?:MixerOptions):Record<Layer,Required<MixerLayer>>;
export function suppressorOptions(options?:SuppressorOptions|boolean):Required<SuppressorOptions>;
export function limiterOptions(options?:LimiterOptions):Required<LimiterOptions>;
export function synthOptions(options?:SynthOptions):Required<SynthOptions>;
export function actionOptions(options?:ActionOptions):Required<ActionOptions>;
export function emitterOptions(options?:EmitterOptions):Omit<EmitterOptions,'environment'> & {environment:Environment};
export function migrateScene(snapshot:unknown):SceneSnapshot;
export function randomSeed():number;
export const VERSION:string;
export const WEAPONS:Readonly<Record<string,Weapon>>;
export const ENVIRONMENTS:Readonly<Record<EnvironmentId,Environment>>;
export const LAYERS:readonly Layer[];
export const ACTION_NAMES:Readonly<Record<ActionName,string>>;
export const DEFAULT_SYNTH:Readonly<Required<SynthOptions>>;
export const DEFAULT_EQ:Readonly<EQOptions>;
export const DEFAULT_CHAIN:Readonly<ChainOptions>;
export const DEFAULT_MIXER:Readonly<Record<Layer,Required<MixerLayer>>>;
export const DEFAULT_SUPPRESSOR:Readonly<Required<SuppressorOptions>>;
export const DEFAULT_LIMITER:Readonly<Required<LimiterOptions>>;
export const EFFECT_PRESETS:Readonly<Record<string,EffectsOptions>>;
declare const Blackline: {
 VERSION:typeof VERSION; Engine:typeof Engine; Emitter:typeof Emitter; WEAPONS:typeof WEAPONS; ENVIRONMENTS:typeof ENVIRONMENTS;
 DEFAULT_SYNTH:typeof DEFAULT_SYNTH; DEFAULT_EQ:typeof DEFAULT_EQ; DEFAULT_CHAIN:typeof DEFAULT_CHAIN; DEFAULT_MIXER:typeof DEFAULT_MIXER; DEFAULT_SUPPRESSOR:typeof DEFAULT_SUPPRESSOR; DEFAULT_LIMITER:typeof DEFAULT_LIMITER; EFFECT_PRESETS:typeof EFFECT_PRESETS; ACTION_NAMES:typeof ACTION_NAMES; LAYERS:typeof LAYERS;
 synthesize:typeof synthesize; synthesizeEvent:typeof synthesizeEvent; resolveEvent:typeof resolveEvent; capabilities:typeof capabilities; registerProfile:typeof registerProfile; registerPreset:typeof registerPreset; renderShot:typeof renderShot; renderSequence:typeof renderSequence; encodeWAV:typeof encodeWAV; PCMBuffer:typeof PCMBuffer; measure:typeof measure; processChain:typeof processChain; LinkedPeakLimiter:typeof LinkedPeakLimiter; limitPCM:typeof limitPCM; effectsOptions:typeof effectsOptions; mixerOptions:typeof mixerOptions; suppressorOptions:typeof suppressorOptions; limiterOptions:typeof limiterOptions; synthOptions:typeof synthOptions; actionOptions:typeof actionOptions; emitterOptions:typeof emitterOptions; migrateScene:typeof migrateScene; randomSeed:typeof randomSeed;
};
export default Blackline;
