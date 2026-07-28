"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod2) => function __require() {
  return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod2, isNodeMode, target) => (target = mod2 != null ? __create(__getProtoOf(mod2)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod2 || !mod2.__esModule ? __defProp(target, "default", { value: mod2, enumerable: true }) : target,
  mod2
));
var __toCommonJS = (mod2) => __copyProps(__defProp({}, "__esModule", { value: true }), mod2);

// node_modules/discord-api-types/gateway/v10.js
var require_v10 = __commonJS({
  "node_modules/discord-api-types/gateway/v10.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.GatewayRequestChannelInfoField = exports2.VoiceChannelEffectSendAnimationType = exports2.GatewayDispatchEvents = exports2.GatewayIntentBits = exports2.GatewayCloseCodes = exports2.GatewayOpcodes = exports2.GatewayVersion = void 0;
    exports2.GatewayVersion = "10";
    var GatewayOpcodes2;
    (function(GatewayOpcodes3) {
      GatewayOpcodes3[GatewayOpcodes3["Dispatch"] = 0] = "Dispatch";
      GatewayOpcodes3[GatewayOpcodes3["Heartbeat"] = 1] = "Heartbeat";
      GatewayOpcodes3[GatewayOpcodes3["Identify"] = 2] = "Identify";
      GatewayOpcodes3[GatewayOpcodes3["PresenceUpdate"] = 3] = "PresenceUpdate";
      GatewayOpcodes3[GatewayOpcodes3["VoiceStateUpdate"] = 4] = "VoiceStateUpdate";
      GatewayOpcodes3[GatewayOpcodes3["Resume"] = 6] = "Resume";
      GatewayOpcodes3[GatewayOpcodes3["Reconnect"] = 7] = "Reconnect";
      GatewayOpcodes3[GatewayOpcodes3["RequestGuildMembers"] = 8] = "RequestGuildMembers";
      GatewayOpcodes3[GatewayOpcodes3["InvalidSession"] = 9] = "InvalidSession";
      GatewayOpcodes3[GatewayOpcodes3["Hello"] = 10] = "Hello";
      GatewayOpcodes3[GatewayOpcodes3["HeartbeatAck"] = 11] = "HeartbeatAck";
      GatewayOpcodes3[GatewayOpcodes3["RequestSoundboardSounds"] = 31] = "RequestSoundboardSounds";
      GatewayOpcodes3[GatewayOpcodes3["RequestChannelInfo"] = 43] = "RequestChannelInfo";
    })(GatewayOpcodes2 || (exports2.GatewayOpcodes = GatewayOpcodes2 = {}));
    var GatewayCloseCodes2;
    (function(GatewayCloseCodes3) {
      GatewayCloseCodes3[GatewayCloseCodes3["UnknownError"] = 4e3] = "UnknownError";
      GatewayCloseCodes3[GatewayCloseCodes3["UnknownOpcode"] = 4001] = "UnknownOpcode";
      GatewayCloseCodes3[GatewayCloseCodes3["DecodeError"] = 4002] = "DecodeError";
      GatewayCloseCodes3[GatewayCloseCodes3["NotAuthenticated"] = 4003] = "NotAuthenticated";
      GatewayCloseCodes3[GatewayCloseCodes3["AuthenticationFailed"] = 4004] = "AuthenticationFailed";
      GatewayCloseCodes3[GatewayCloseCodes3["AlreadyAuthenticated"] = 4005] = "AlreadyAuthenticated";
      GatewayCloseCodes3[GatewayCloseCodes3["InvalidSeq"] = 4007] = "InvalidSeq";
      GatewayCloseCodes3[GatewayCloseCodes3["RateLimited"] = 4008] = "RateLimited";
      GatewayCloseCodes3[GatewayCloseCodes3["SessionTimedOut"] = 4009] = "SessionTimedOut";
      GatewayCloseCodes3[GatewayCloseCodes3["InvalidShard"] = 4010] = "InvalidShard";
      GatewayCloseCodes3[GatewayCloseCodes3["ShardingRequired"] = 4011] = "ShardingRequired";
      GatewayCloseCodes3[GatewayCloseCodes3["InvalidAPIVersion"] = 4012] = "InvalidAPIVersion";
      GatewayCloseCodes3[GatewayCloseCodes3["InvalidIntents"] = 4013] = "InvalidIntents";
      GatewayCloseCodes3[GatewayCloseCodes3["DisallowedIntents"] = 4014] = "DisallowedIntents";
    })(GatewayCloseCodes2 || (exports2.GatewayCloseCodes = GatewayCloseCodes2 = {}));
    var GatewayIntentBits2;
    (function(GatewayIntentBits3) {
      GatewayIntentBits3[GatewayIntentBits3["Guilds"] = 1] = "Guilds";
      GatewayIntentBits3[GatewayIntentBits3["GuildMembers"] = 2] = "GuildMembers";
      GatewayIntentBits3[GatewayIntentBits3["GuildModeration"] = 4] = "GuildModeration";
      GatewayIntentBits3[GatewayIntentBits3["GuildBans"] = 4] = "GuildBans";
      GatewayIntentBits3[GatewayIntentBits3["GuildExpressions"] = 8] = "GuildExpressions";
      GatewayIntentBits3[GatewayIntentBits3["GuildEmojisAndStickers"] = 8] = "GuildEmojisAndStickers";
      GatewayIntentBits3[GatewayIntentBits3["GuildIntegrations"] = 16] = "GuildIntegrations";
      GatewayIntentBits3[GatewayIntentBits3["GuildWebhooks"] = 32] = "GuildWebhooks";
      GatewayIntentBits3[GatewayIntentBits3["GuildInvites"] = 64] = "GuildInvites";
      GatewayIntentBits3[GatewayIntentBits3["GuildVoiceStates"] = 128] = "GuildVoiceStates";
      GatewayIntentBits3[GatewayIntentBits3["GuildPresences"] = 256] = "GuildPresences";
      GatewayIntentBits3[GatewayIntentBits3["GuildMessages"] = 512] = "GuildMessages";
      GatewayIntentBits3[GatewayIntentBits3["GuildMessageReactions"] = 1024] = "GuildMessageReactions";
      GatewayIntentBits3[GatewayIntentBits3["GuildMessageTyping"] = 2048] = "GuildMessageTyping";
      GatewayIntentBits3[GatewayIntentBits3["DirectMessages"] = 4096] = "DirectMessages";
      GatewayIntentBits3[GatewayIntentBits3["DirectMessageReactions"] = 8192] = "DirectMessageReactions";
      GatewayIntentBits3[GatewayIntentBits3["DirectMessageTyping"] = 16384] = "DirectMessageTyping";
      GatewayIntentBits3[GatewayIntentBits3["MessageContent"] = 32768] = "MessageContent";
      GatewayIntentBits3[GatewayIntentBits3["GuildScheduledEvents"] = 65536] = "GuildScheduledEvents";
      GatewayIntentBits3[GatewayIntentBits3["AutoModerationConfiguration"] = 1048576] = "AutoModerationConfiguration";
      GatewayIntentBits3[GatewayIntentBits3["AutoModerationExecution"] = 2097152] = "AutoModerationExecution";
      GatewayIntentBits3[GatewayIntentBits3["GuildMessagePolls"] = 16777216] = "GuildMessagePolls";
      GatewayIntentBits3[GatewayIntentBits3["DirectMessagePolls"] = 33554432] = "DirectMessagePolls";
    })(GatewayIntentBits2 || (exports2.GatewayIntentBits = GatewayIntentBits2 = {}));
    var GatewayDispatchEvents2;
    (function(GatewayDispatchEvents3) {
      GatewayDispatchEvents3["ApplicationCommandPermissionsUpdate"] = "APPLICATION_COMMAND_PERMISSIONS_UPDATE";
      GatewayDispatchEvents3["AutoModerationActionExecution"] = "AUTO_MODERATION_ACTION_EXECUTION";
      GatewayDispatchEvents3["AutoModerationRuleCreate"] = "AUTO_MODERATION_RULE_CREATE";
      GatewayDispatchEvents3["AutoModerationRuleDelete"] = "AUTO_MODERATION_RULE_DELETE";
      GatewayDispatchEvents3["AutoModerationRuleUpdate"] = "AUTO_MODERATION_RULE_UPDATE";
      GatewayDispatchEvents3["ChannelCreate"] = "CHANNEL_CREATE";
      GatewayDispatchEvents3["ChannelDelete"] = "CHANNEL_DELETE";
      GatewayDispatchEvents3["ChannelInfo"] = "CHANNEL_INFO";
      GatewayDispatchEvents3["ChannelPinsUpdate"] = "CHANNEL_PINS_UPDATE";
      GatewayDispatchEvents3["ChannelUpdate"] = "CHANNEL_UPDATE";
      GatewayDispatchEvents3["EntitlementCreate"] = "ENTITLEMENT_CREATE";
      GatewayDispatchEvents3["EntitlementDelete"] = "ENTITLEMENT_DELETE";
      GatewayDispatchEvents3["EntitlementUpdate"] = "ENTITLEMENT_UPDATE";
      GatewayDispatchEvents3["GuildAuditLogEntryCreate"] = "GUILD_AUDIT_LOG_ENTRY_CREATE";
      GatewayDispatchEvents3["GuildBanAdd"] = "GUILD_BAN_ADD";
      GatewayDispatchEvents3["GuildBanRemove"] = "GUILD_BAN_REMOVE";
      GatewayDispatchEvents3["GuildCreate"] = "GUILD_CREATE";
      GatewayDispatchEvents3["GuildDelete"] = "GUILD_DELETE";
      GatewayDispatchEvents3["GuildEmojisUpdate"] = "GUILD_EMOJIS_UPDATE";
      GatewayDispatchEvents3["GuildIntegrationsUpdate"] = "GUILD_INTEGRATIONS_UPDATE";
      GatewayDispatchEvents3["GuildMemberAdd"] = "GUILD_MEMBER_ADD";
      GatewayDispatchEvents3["GuildMemberRemove"] = "GUILD_MEMBER_REMOVE";
      GatewayDispatchEvents3["GuildMembersChunk"] = "GUILD_MEMBERS_CHUNK";
      GatewayDispatchEvents3["GuildMemberUpdate"] = "GUILD_MEMBER_UPDATE";
      GatewayDispatchEvents3["GuildRoleCreate"] = "GUILD_ROLE_CREATE";
      GatewayDispatchEvents3["GuildRoleDelete"] = "GUILD_ROLE_DELETE";
      GatewayDispatchEvents3["GuildRoleUpdate"] = "GUILD_ROLE_UPDATE";
      GatewayDispatchEvents3["GuildScheduledEventCreate"] = "GUILD_SCHEDULED_EVENT_CREATE";
      GatewayDispatchEvents3["GuildScheduledEventDelete"] = "GUILD_SCHEDULED_EVENT_DELETE";
      GatewayDispatchEvents3["GuildScheduledEventUpdate"] = "GUILD_SCHEDULED_EVENT_UPDATE";
      GatewayDispatchEvents3["GuildScheduledEventUserAdd"] = "GUILD_SCHEDULED_EVENT_USER_ADD";
      GatewayDispatchEvents3["GuildScheduledEventUserRemove"] = "GUILD_SCHEDULED_EVENT_USER_REMOVE";
      GatewayDispatchEvents3["GuildSoundboardSoundCreate"] = "GUILD_SOUNDBOARD_SOUND_CREATE";
      GatewayDispatchEvents3["GuildSoundboardSoundDelete"] = "GUILD_SOUNDBOARD_SOUND_DELETE";
      GatewayDispatchEvents3["GuildSoundboardSoundsUpdate"] = "GUILD_SOUNDBOARD_SOUNDS_UPDATE";
      GatewayDispatchEvents3["GuildSoundboardSoundUpdate"] = "GUILD_SOUNDBOARD_SOUND_UPDATE";
      GatewayDispatchEvents3["SoundboardSounds"] = "SOUNDBOARD_SOUNDS";
      GatewayDispatchEvents3["GuildStickersUpdate"] = "GUILD_STICKERS_UPDATE";
      GatewayDispatchEvents3["GuildUpdate"] = "GUILD_UPDATE";
      GatewayDispatchEvents3["IntegrationCreate"] = "INTEGRATION_CREATE";
      GatewayDispatchEvents3["IntegrationDelete"] = "INTEGRATION_DELETE";
      GatewayDispatchEvents3["IntegrationUpdate"] = "INTEGRATION_UPDATE";
      GatewayDispatchEvents3["InteractionCreate"] = "INTERACTION_CREATE";
      GatewayDispatchEvents3["InviteCreate"] = "INVITE_CREATE";
      GatewayDispatchEvents3["InviteDelete"] = "INVITE_DELETE";
      GatewayDispatchEvents3["MessageCreate"] = "MESSAGE_CREATE";
      GatewayDispatchEvents3["MessageDelete"] = "MESSAGE_DELETE";
      GatewayDispatchEvents3["MessageDeleteBulk"] = "MESSAGE_DELETE_BULK";
      GatewayDispatchEvents3["MessagePollVoteAdd"] = "MESSAGE_POLL_VOTE_ADD";
      GatewayDispatchEvents3["MessagePollVoteRemove"] = "MESSAGE_POLL_VOTE_REMOVE";
      GatewayDispatchEvents3["MessageReactionAdd"] = "MESSAGE_REACTION_ADD";
      GatewayDispatchEvents3["MessageReactionRemove"] = "MESSAGE_REACTION_REMOVE";
      GatewayDispatchEvents3["MessageReactionRemoveAll"] = "MESSAGE_REACTION_REMOVE_ALL";
      GatewayDispatchEvents3["MessageReactionRemoveEmoji"] = "MESSAGE_REACTION_REMOVE_EMOJI";
      GatewayDispatchEvents3["MessageUpdate"] = "MESSAGE_UPDATE";
      GatewayDispatchEvents3["PresenceUpdate"] = "PRESENCE_UPDATE";
      GatewayDispatchEvents3["RateLimited"] = "RATE_LIMITED";
      GatewayDispatchEvents3["Ready"] = "READY";
      GatewayDispatchEvents3["Resumed"] = "RESUMED";
      GatewayDispatchEvents3["StageInstanceCreate"] = "STAGE_INSTANCE_CREATE";
      GatewayDispatchEvents3["StageInstanceDelete"] = "STAGE_INSTANCE_DELETE";
      GatewayDispatchEvents3["StageInstanceUpdate"] = "STAGE_INSTANCE_UPDATE";
      GatewayDispatchEvents3["SubscriptionCreate"] = "SUBSCRIPTION_CREATE";
      GatewayDispatchEvents3["SubscriptionDelete"] = "SUBSCRIPTION_DELETE";
      GatewayDispatchEvents3["SubscriptionUpdate"] = "SUBSCRIPTION_UPDATE";
      GatewayDispatchEvents3["ThreadCreate"] = "THREAD_CREATE";
      GatewayDispatchEvents3["ThreadDelete"] = "THREAD_DELETE";
      GatewayDispatchEvents3["ThreadListSync"] = "THREAD_LIST_SYNC";
      GatewayDispatchEvents3["ThreadMembersUpdate"] = "THREAD_MEMBERS_UPDATE";
      GatewayDispatchEvents3["ThreadMemberUpdate"] = "THREAD_MEMBER_UPDATE";
      GatewayDispatchEvents3["ThreadUpdate"] = "THREAD_UPDATE";
      GatewayDispatchEvents3["TypingStart"] = "TYPING_START";
      GatewayDispatchEvents3["UserUpdate"] = "USER_UPDATE";
      GatewayDispatchEvents3["VoiceChannelEffectSend"] = "VOICE_CHANNEL_EFFECT_SEND";
      GatewayDispatchEvents3["VoiceChannelStartTimeUpdate"] = "VOICE_CHANNEL_START_TIME_UPDATE";
      GatewayDispatchEvents3["VoiceChannelStatusUpdate"] = "VOICE_CHANNEL_STATUS_UPDATE";
      GatewayDispatchEvents3["VoiceServerUpdate"] = "VOICE_SERVER_UPDATE";
      GatewayDispatchEvents3["VoiceStateUpdate"] = "VOICE_STATE_UPDATE";
      GatewayDispatchEvents3["WebhooksUpdate"] = "WEBHOOKS_UPDATE";
    })(GatewayDispatchEvents2 || (exports2.GatewayDispatchEvents = GatewayDispatchEvents2 = {}));
    var VoiceChannelEffectSendAnimationType2;
    (function(VoiceChannelEffectSendAnimationType3) {
      VoiceChannelEffectSendAnimationType3[VoiceChannelEffectSendAnimationType3["Premium"] = 0] = "Premium";
      VoiceChannelEffectSendAnimationType3[VoiceChannelEffectSendAnimationType3["Basic"] = 1] = "Basic";
    })(VoiceChannelEffectSendAnimationType2 || (exports2.VoiceChannelEffectSendAnimationType = VoiceChannelEffectSendAnimationType2 = {}));
    var GatewayRequestChannelInfoField2;
    (function(GatewayRequestChannelInfoField3) {
      GatewayRequestChannelInfoField3["Status"] = "status";
      GatewayRequestChannelInfoField3["VoiceStartTime"] = "voice_start_time";
    })(GatewayRequestChannelInfoField2 || (exports2.GatewayRequestChannelInfoField = GatewayRequestChannelInfoField2 = {}));
  }
});

// node_modules/discord-api-types/globals.js
var require_globals = __commonJS({
  "node_modules/discord-api-types/globals.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.FormattingPatterns = void 0;
    var timestampStyles = "DFRSTdfst";
    var timestampLength = 13;
    exports2.FormattingPatterns = {
      /**
       * Regular expression for matching a user mention, strictly without a nickname
       *
       * The `id` group property is present on the `exec` result of this expression
       */
      User: /<@(?<id>\d{17,20})>/,
      /**
       * Regular expression for matching a user mention, strictly with a nickname
       *
       * The `id` group property is present on the `exec` result of this expression
       *
       * @deprecated Passing `!` in user mentions is no longer necessary / supported, and future message contents won't have it
       */
      UserWithNickname: /<@!(?<id>\d{17,20})>/,
      /**
       * Regular expression for matching a user mention, with or without a nickname
       *
       * The `id` group property is present on the `exec` result of this expression
       *
       * @deprecated Passing `!` in user mentions is no longer necessary / supported, and future message contents won't have it
       */
      UserWithOptionalNickname: /<@!?(?<id>\d{17,20})>/,
      /**
       * Regular expression for matching a channel mention
       *
       * The `id` group property is present on the `exec` result of this expression
       */
      Channel: /<#(?<id>\d{17,20})>/,
      /**
       * Regular expression for matching a role mention
       *
       * The `id` group property is present on the `exec` result of this expression
       */
      Role: /<@&(?<id>\d{17,20})>/,
      /**
       * Regular expression for matching a application command mention
       *
       * The `fullName` (possibly including `name`, `subcommandOrGroup` and `subcommand`) and `id` group properties are present on the `exec` result of this expression
       */
      SlashCommand: /<\/(?<fullName>(?<name>[-_\p{Letter}\p{Number}\p{sc=Deva}\p{sc=Thai}]{1,32})(?: (?<subcommandOrGroup>[-_\p{Letter}\p{Number}\p{sc=Deva}\p{sc=Thai}]{1,32}))?(?: (?<subcommand>[-_\p{Letter}\p{Number}\p{sc=Deva}\p{sc=Thai}]{1,32}))?):(?<id>\d{17,20})>/u,
      /**
       * Regular expression for matching a custom emoji, either static or animated
       *
       * The `animated`, `name` and `id` group properties are present on the `exec` result of this expression
       */
      Emoji: /<(?<animated>a)?:(?<name>\w{2,32}):(?<id>\d{17,20})>/,
      /**
       * Regular expression for matching strictly an animated custom emoji
       *
       * The `animated`, `name` and `id` group properties are present on the `exec` result of this expression
       */
      AnimatedEmoji: /<(?<animated>a):(?<name>\w{2,32}):(?<id>\d{17,20})>/,
      /**
       * Regular expression for matching strictly a static custom emoji
       *
       * The `name` and `id` group properties are present on the `exec` result of this expression
       */
      StaticEmoji: /<:(?<name>\w{2,32}):(?<id>\d{17,20})>/,
      /**
       * Regular expression for matching a timestamp, either default or custom styled
       *
       * The `timestamp` and `style` group properties are present on the `exec` result of this expression
       */
      Timestamp: new RegExp(`<t:(?<timestamp>-?\\d{1,${timestampLength}})(:(?<style>[${timestampStyles}]))?>`),
      /**
       * Regular expression for matching strictly default styled timestamps
       *
       * The `timestamp` group property is present on the `exec` result of this expression
       */
      DefaultStyledTimestamp: new RegExp(`<t:(?<timestamp>-?\\d{1,${timestampLength}})>`),
      /**
       * Regular expression for matching strictly custom styled timestamps
       *
       * The `timestamp` and `style` group properties are present on the `exec` result of this expression
       */
      StyledTimestamp: new RegExp(`<t:(?<timestamp>-?\\d{1,${timestampLength}}):(?<style>[${timestampStyles}])>`),
      /**
       * Regular expression for matching a guild navigation mention
       *
       * The `type` group property is present on the `exec` result of this expression
       */
      GuildNavigation: /<id:(?<type>customize|browse|guide|linked-roles)>/,
      /**
       * Regular expression for matching a linked role mention
       *
       * The `id` group property is present on the `exec` result of this expression
       */
      LinkedRole: /<id:linked-roles:(?<id>\d{17,20})>/
    };
    Object.freeze(exports2.FormattingPatterns);
  }
});

// node_modules/discord-api-types/payloads/common.js
var require_common = __commonJS({
  "node_modules/discord-api-types/payloads/common.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.PermissionFlagsBits = void 0;
    exports2.PermissionFlagsBits = {
      /**
       * Allows creation of instant invites
       *
       * Applies to channel types: Text, Voice, Stage
       */
      CreateInstantInvite: 1n << 0n,
      /**
       * Allows kicking members
       */
      KickMembers: 1n << 1n,
      /**
       * Allows banning members
       */
      BanMembers: 1n << 2n,
      /**
       * Allows all permissions and bypasses channel permission overwrites
       */
      Administrator: 1n << 3n,
      /**
       * Allows management and editing of channels
       *
       * Applies to channel types: Text, Voice, Stage
       */
      ManageChannels: 1n << 4n,
      /**
       * Allows management and editing of the guild
       */
      ManageGuild: 1n << 5n,
      /**
       * Allows for the addition of reactions to messages. This permission does not apply to reacting with an existing reaction on a message
       *
       * Applies to channel types: Text, Voice, Stage
       */
      AddReactions: 1n << 6n,
      /**
       * Allows for viewing of audit logs
       */
      ViewAuditLog: 1n << 7n,
      /**
       * Allows for using priority speaker in a voice channel
       *
       * Applies to channel types: Voice
       */
      PrioritySpeaker: 1n << 8n,
      /**
       * Allows the user to go live
       *
       * Applies to channel types: Voice, Stage
       */
      Stream: 1n << 9n,
      /**
       * Allows guild members to view a channel, which includes reading messages in text channels and joining voice channels
       *
       * Applies to channel types: Text, Voice, Stage
       */
      ViewChannel: 1n << 10n,
      /**
       * Allows for sending messages in a channel and creating threads in a forum
       * (does not allow sending messages in threads)
       *
       * Applies to channel types: Text, Voice, Stage
       */
      SendMessages: 1n << 11n,
      /**
       * Allows for sending of `/tts` messages
       *
       * Applies to channel types: Text, Voice, Stage
       */
      SendTTSMessages: 1n << 12n,
      /**
       * Allows for deletion of other users messages
       *
       * Applies to channel types: Text, Voice, Stage
       */
      ManageMessages: 1n << 13n,
      /**
       * Links sent by users with this permission will be auto-embedded
       *
       * Applies to channel types: Text, Voice, Stage
       */
      EmbedLinks: 1n << 14n,
      /**
       * Allows for uploading images and files
       *
       * Applies to channel types: Text, Voice, Stage
       */
      AttachFiles: 1n << 15n,
      /**
       * Allows for reading of message history
       *
       * Applies to channel types: Text, Voice, Stage
       */
      ReadMessageHistory: 1n << 16n,
      /**
       * Allows for using the `@everyone` tag to notify all users in a channel,
       * and the `@here` tag to notify all online users in a channel
       *
       * Applies to channel types: Text, Voice, Stage
       */
      MentionEveryone: 1n << 17n,
      /**
       * Allows the usage of custom emojis from other servers
       *
       * Applies to channel types: Text, Voice, Stage
       */
      UseExternalEmojis: 1n << 18n,
      /**
       * Allows for viewing guild insights
       */
      ViewGuildInsights: 1n << 19n,
      /**
       * Allows for joining of a voice channel
       *
       * Applies to channel types: Voice, Stage
       */
      Connect: 1n << 20n,
      /**
       * Allows for speaking in a voice channel
       *
       * Applies to channel types: Voice
       */
      Speak: 1n << 21n,
      /**
       * Allows for muting members in a voice channel
       *
       * Applies to channel types: Voice, Stage
       */
      MuteMembers: 1n << 22n,
      /**
       * Allows for deafening of members in a voice channel
       *
       * Applies to channel types: Voice
       */
      DeafenMembers: 1n << 23n,
      /**
       * Allows for moving of members between voice channels
       *
       * Applies to channel types: Voice, Stage
       */
      MoveMembers: 1n << 24n,
      /**
       * Allows for using voice-activity-detection in a voice channel
       *
       * Applies to channel types: Voice
       */
      UseVAD: 1n << 25n,
      /**
       * Allows for modification of own nickname
       */
      ChangeNickname: 1n << 26n,
      /**
       * Allows for modification of other users nicknames
       */
      ManageNicknames: 1n << 27n,
      /**
       * Allows management and editing of roles
       *
       * Applies to channel types: Text, Voice, Stage
       */
      ManageRoles: 1n << 28n,
      /**
       * Allows management and editing of webhooks
       *
       * Applies to channel types: Text, Voice, Stage
       */
      ManageWebhooks: 1n << 29n,
      /**
       * Allows management and editing of emojis, stickers, and soundboard sounds
       *
       * @deprecated This is the old name for {@link PermissionFlagsBits.ManageGuildExpressions}
       */
      ManageEmojisAndStickers: 1n << 30n,
      /**
       * Allows for editing and deleting emojis, stickers, and soundboard sounds created by all users
       */
      ManageGuildExpressions: 1n << 30n,
      /**
       * Allows members to use application commands, including slash commands and context menu commands
       *
       * Applies to channel types: Text, Voice, Stage
       */
      UseApplicationCommands: 1n << 31n,
      /**
       * Allows for requesting to speak in stage channels
       *
       * Applies to channel types: Stage
       */
      RequestToSpeak: 1n << 32n,
      /**
       * Allows for editing and deleting scheduled events created by all users
       *
       * Applies to channel types: Voice, Stage
       */
      ManageEvents: 1n << 33n,
      /**
       * Allows for deleting and archiving threads, and viewing all private threads
       *
       * Applies to channel types: Text
       */
      ManageThreads: 1n << 34n,
      /**
       * Allows for creating public and announcement threads
       *
       * Applies to channel types: Text
       */
      CreatePublicThreads: 1n << 35n,
      /**
       * Allows for creating private threads
       *
       * Applies to channel types: Text
       */
      CreatePrivateThreads: 1n << 36n,
      /**
       * Allows the usage of custom stickers from other servers
       *
       * Applies to channel types: Text, Voice, Stage
       */
      UseExternalStickers: 1n << 37n,
      /**
       * Allows for sending messages in threads
       *
       * Applies to channel types: Text
       */
      SendMessagesInThreads: 1n << 38n,
      /**
       * Allows for using Activities (applications with the {@link ApplicationFlags.Embedded} flag)
       *
       * Applies to channel types: Text, Voice
       */
      UseEmbeddedActivities: 1n << 39n,
      /**
       * Allows for timing out users to prevent them from sending or reacting to messages in chat and threads,
       * and from speaking in voice and stage channels
       */
      ModerateMembers: 1n << 40n,
      /**
       * Allows for viewing role subscription insights
       */
      ViewCreatorMonetizationAnalytics: 1n << 41n,
      /**
       * Allows for using soundboard in a voice channel
       *
       * Applies to channel types: Voice
       */
      UseSoundboard: 1n << 42n,
      /**
       * Allows for creating emojis, stickers, and soundboard sounds, and editing and deleting those created by the current user
       */
      CreateGuildExpressions: 1n << 43n,
      /**
       * Allows for creating scheduled events, and editing and deleting those created by the current user
       *
       * Applies to channel types: Voice, Stage
       */
      CreateEvents: 1n << 44n,
      /**
       * Allows the usage of custom soundboard sounds from other servers
       *
       * Applies to channel types: Voice
       */
      UseExternalSounds: 1n << 45n,
      /**
       * Allows sending voice messages
       *
       * Applies to channel types: Text, Voice, Stage
       */
      SendVoiceMessages: 1n << 46n,
      /**
       * Allows setting voice channel status
       *
       * Applies to channel types: Voice
       */
      SetVoiceChannelStatus: 1n << 48n,
      /**
       * Allows sending polls
       *
       * Applies to channel types: Text, Voice, Stage
       */
      SendPolls: 1n << 49n,
      /**
       * Allows user-installed apps to send public responses. When disabled, users will still be allowed to use their apps but the responses will be ephemeral. This only applies to apps not also installed to the server
       *
       * Applies to channel types: Text, Voice, Stage
       */
      UseExternalApps: 1n << 50n,
      /**
       * Allows pinning and unpinning messages
       *
       * Applies to channel types: Text
       */
      PinMessages: 1n << 51n,
      /**
       * Allows bypassing slowmode restrictions
       *
       * Applies to channel types: Text, Voice, Stage
       */
      BypassSlowmode: 1n << 52n
    };
    Object.freeze(exports2.PermissionFlagsBits);
  }
});

// node_modules/discord-api-types/payloads/v10/application.js
var require_application = __commonJS({
  "node_modules/discord-api-types/payloads/v10/application.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ApplicationWebhookEventStatus = exports2.ActivityLocationKind = exports2.ApplicationRoleConnectionMetadataType = exports2.ApplicationFlags = void 0;
    var ApplicationFlags2;
    (function(ApplicationFlags3) {
      ApplicationFlags3[ApplicationFlags3["EmbeddedReleased"] = 2] = "EmbeddedReleased";
      ApplicationFlags3[ApplicationFlags3["ManagedEmoji"] = 4] = "ManagedEmoji";
      ApplicationFlags3[ApplicationFlags3["EmbeddedIAP"] = 8] = "EmbeddedIAP";
      ApplicationFlags3[ApplicationFlags3["GroupDMCreate"] = 16] = "GroupDMCreate";
      ApplicationFlags3[ApplicationFlags3["ApplicationAutoModerationRuleCreateBadge"] = 64] = "ApplicationAutoModerationRuleCreateBadge";
      ApplicationFlags3[ApplicationFlags3["RPCHasConnected"] = 2048] = "RPCHasConnected";
      ApplicationFlags3[ApplicationFlags3["GatewayPresence"] = 4096] = "GatewayPresence";
      ApplicationFlags3[ApplicationFlags3["GatewayPresenceLimited"] = 8192] = "GatewayPresenceLimited";
      ApplicationFlags3[ApplicationFlags3["GatewayGuildMembers"] = 16384] = "GatewayGuildMembers";
      ApplicationFlags3[ApplicationFlags3["GatewayGuildMembersLimited"] = 32768] = "GatewayGuildMembersLimited";
      ApplicationFlags3[ApplicationFlags3["VerificationPendingGuildLimit"] = 65536] = "VerificationPendingGuildLimit";
      ApplicationFlags3[ApplicationFlags3["Embedded"] = 131072] = "Embedded";
      ApplicationFlags3[ApplicationFlags3["GatewayMessageContent"] = 262144] = "GatewayMessageContent";
      ApplicationFlags3[ApplicationFlags3["GatewayMessageContentLimited"] = 524288] = "GatewayMessageContentLimited";
      ApplicationFlags3[ApplicationFlags3["EmbeddedFirstParty"] = 1048576] = "EmbeddedFirstParty";
      ApplicationFlags3[ApplicationFlags3["ApplicationCommandBadge"] = 8388608] = "ApplicationCommandBadge";
    })(ApplicationFlags2 || (exports2.ApplicationFlags = ApplicationFlags2 = {}));
    var ApplicationRoleConnectionMetadataType2;
    (function(ApplicationRoleConnectionMetadataType3) {
      ApplicationRoleConnectionMetadataType3[ApplicationRoleConnectionMetadataType3["IntegerLessThanOrEqual"] = 1] = "IntegerLessThanOrEqual";
      ApplicationRoleConnectionMetadataType3[ApplicationRoleConnectionMetadataType3["IntegerGreaterThanOrEqual"] = 2] = "IntegerGreaterThanOrEqual";
      ApplicationRoleConnectionMetadataType3[ApplicationRoleConnectionMetadataType3["IntegerEqual"] = 3] = "IntegerEqual";
      ApplicationRoleConnectionMetadataType3[ApplicationRoleConnectionMetadataType3["IntegerNotEqual"] = 4] = "IntegerNotEqual";
      ApplicationRoleConnectionMetadataType3[ApplicationRoleConnectionMetadataType3["DatetimeLessThanOrEqual"] = 5] = "DatetimeLessThanOrEqual";
      ApplicationRoleConnectionMetadataType3[ApplicationRoleConnectionMetadataType3["DatetimeGreaterThanOrEqual"] = 6] = "DatetimeGreaterThanOrEqual";
      ApplicationRoleConnectionMetadataType3[ApplicationRoleConnectionMetadataType3["BooleanEqual"] = 7] = "BooleanEqual";
      ApplicationRoleConnectionMetadataType3[ApplicationRoleConnectionMetadataType3["BooleanNotEqual"] = 8] = "BooleanNotEqual";
    })(ApplicationRoleConnectionMetadataType2 || (exports2.ApplicationRoleConnectionMetadataType = ApplicationRoleConnectionMetadataType2 = {}));
    var ActivityLocationKind2;
    (function(ActivityLocationKind3) {
      ActivityLocationKind3["GuildChannel"] = "gc";
      ActivityLocationKind3["PrivateChannel"] = "pc";
    })(ActivityLocationKind2 || (exports2.ActivityLocationKind = ActivityLocationKind2 = {}));
    var ApplicationWebhookEventStatus2;
    (function(ApplicationWebhookEventStatus3) {
      ApplicationWebhookEventStatus3[ApplicationWebhookEventStatus3["Disabled"] = 1] = "Disabled";
      ApplicationWebhookEventStatus3[ApplicationWebhookEventStatus3["Enabled"] = 2] = "Enabled";
      ApplicationWebhookEventStatus3[ApplicationWebhookEventStatus3["DisabledByDiscord"] = 3] = "DisabledByDiscord";
    })(ApplicationWebhookEventStatus2 || (exports2.ApplicationWebhookEventStatus = ApplicationWebhookEventStatus2 = {}));
  }
});

// node_modules/discord-api-types/payloads/v10/auditLog.js
var require_auditLog = __commonJS({
  "node_modules/discord-api-types/payloads/v10/auditLog.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.AuditLogOptionsType = exports2.AuditLogEvent = void 0;
    var AuditLogEvent2;
    (function(AuditLogEvent3) {
      AuditLogEvent3[AuditLogEvent3["GuildUpdate"] = 1] = "GuildUpdate";
      AuditLogEvent3[AuditLogEvent3["ChannelCreate"] = 10] = "ChannelCreate";
      AuditLogEvent3[AuditLogEvent3["ChannelUpdate"] = 11] = "ChannelUpdate";
      AuditLogEvent3[AuditLogEvent3["ChannelDelete"] = 12] = "ChannelDelete";
      AuditLogEvent3[AuditLogEvent3["ChannelOverwriteCreate"] = 13] = "ChannelOverwriteCreate";
      AuditLogEvent3[AuditLogEvent3["ChannelOverwriteUpdate"] = 14] = "ChannelOverwriteUpdate";
      AuditLogEvent3[AuditLogEvent3["ChannelOverwriteDelete"] = 15] = "ChannelOverwriteDelete";
      AuditLogEvent3[AuditLogEvent3["MemberKick"] = 20] = "MemberKick";
      AuditLogEvent3[AuditLogEvent3["MemberPrune"] = 21] = "MemberPrune";
      AuditLogEvent3[AuditLogEvent3["MemberBanAdd"] = 22] = "MemberBanAdd";
      AuditLogEvent3[AuditLogEvent3["MemberBanRemove"] = 23] = "MemberBanRemove";
      AuditLogEvent3[AuditLogEvent3["MemberUpdate"] = 24] = "MemberUpdate";
      AuditLogEvent3[AuditLogEvent3["MemberRoleUpdate"] = 25] = "MemberRoleUpdate";
      AuditLogEvent3[AuditLogEvent3["MemberMove"] = 26] = "MemberMove";
      AuditLogEvent3[AuditLogEvent3["MemberDisconnect"] = 27] = "MemberDisconnect";
      AuditLogEvent3[AuditLogEvent3["BotAdd"] = 28] = "BotAdd";
      AuditLogEvent3[AuditLogEvent3["RoleCreate"] = 30] = "RoleCreate";
      AuditLogEvent3[AuditLogEvent3["RoleUpdate"] = 31] = "RoleUpdate";
      AuditLogEvent3[AuditLogEvent3["RoleDelete"] = 32] = "RoleDelete";
      AuditLogEvent3[AuditLogEvent3["InviteCreate"] = 40] = "InviteCreate";
      AuditLogEvent3[AuditLogEvent3["InviteUpdate"] = 41] = "InviteUpdate";
      AuditLogEvent3[AuditLogEvent3["InviteDelete"] = 42] = "InviteDelete";
      AuditLogEvent3[AuditLogEvent3["WebhookCreate"] = 50] = "WebhookCreate";
      AuditLogEvent3[AuditLogEvent3["WebhookUpdate"] = 51] = "WebhookUpdate";
      AuditLogEvent3[AuditLogEvent3["WebhookDelete"] = 52] = "WebhookDelete";
      AuditLogEvent3[AuditLogEvent3["EmojiCreate"] = 60] = "EmojiCreate";
      AuditLogEvent3[AuditLogEvent3["EmojiUpdate"] = 61] = "EmojiUpdate";
      AuditLogEvent3[AuditLogEvent3["EmojiDelete"] = 62] = "EmojiDelete";
      AuditLogEvent3[AuditLogEvent3["MessageDelete"] = 72] = "MessageDelete";
      AuditLogEvent3[AuditLogEvent3["MessageBulkDelete"] = 73] = "MessageBulkDelete";
      AuditLogEvent3[AuditLogEvent3["MessagePin"] = 74] = "MessagePin";
      AuditLogEvent3[AuditLogEvent3["MessageUnpin"] = 75] = "MessageUnpin";
      AuditLogEvent3[AuditLogEvent3["IntegrationCreate"] = 80] = "IntegrationCreate";
      AuditLogEvent3[AuditLogEvent3["IntegrationUpdate"] = 81] = "IntegrationUpdate";
      AuditLogEvent3[AuditLogEvent3["IntegrationDelete"] = 82] = "IntegrationDelete";
      AuditLogEvent3[AuditLogEvent3["StageInstanceCreate"] = 83] = "StageInstanceCreate";
      AuditLogEvent3[AuditLogEvent3["StageInstanceUpdate"] = 84] = "StageInstanceUpdate";
      AuditLogEvent3[AuditLogEvent3["StageInstanceDelete"] = 85] = "StageInstanceDelete";
      AuditLogEvent3[AuditLogEvent3["StickerCreate"] = 90] = "StickerCreate";
      AuditLogEvent3[AuditLogEvent3["StickerUpdate"] = 91] = "StickerUpdate";
      AuditLogEvent3[AuditLogEvent3["StickerDelete"] = 92] = "StickerDelete";
      AuditLogEvent3[AuditLogEvent3["GuildScheduledEventCreate"] = 100] = "GuildScheduledEventCreate";
      AuditLogEvent3[AuditLogEvent3["GuildScheduledEventUpdate"] = 101] = "GuildScheduledEventUpdate";
      AuditLogEvent3[AuditLogEvent3["GuildScheduledEventDelete"] = 102] = "GuildScheduledEventDelete";
      AuditLogEvent3[AuditLogEvent3["ThreadCreate"] = 110] = "ThreadCreate";
      AuditLogEvent3[AuditLogEvent3["ThreadUpdate"] = 111] = "ThreadUpdate";
      AuditLogEvent3[AuditLogEvent3["ThreadDelete"] = 112] = "ThreadDelete";
      AuditLogEvent3[AuditLogEvent3["ApplicationCommandPermissionUpdate"] = 121] = "ApplicationCommandPermissionUpdate";
      AuditLogEvent3[AuditLogEvent3["SoundboardSoundCreate"] = 130] = "SoundboardSoundCreate";
      AuditLogEvent3[AuditLogEvent3["SoundboardSoundUpdate"] = 131] = "SoundboardSoundUpdate";
      AuditLogEvent3[AuditLogEvent3["SoundboardSoundDelete"] = 132] = "SoundboardSoundDelete";
      AuditLogEvent3[AuditLogEvent3["AutoModerationRuleCreate"] = 140] = "AutoModerationRuleCreate";
      AuditLogEvent3[AuditLogEvent3["AutoModerationRuleUpdate"] = 141] = "AutoModerationRuleUpdate";
      AuditLogEvent3[AuditLogEvent3["AutoModerationRuleDelete"] = 142] = "AutoModerationRuleDelete";
      AuditLogEvent3[AuditLogEvent3["AutoModerationBlockMessage"] = 143] = "AutoModerationBlockMessage";
      AuditLogEvent3[AuditLogEvent3["AutoModerationFlagToChannel"] = 144] = "AutoModerationFlagToChannel";
      AuditLogEvent3[AuditLogEvent3["AutoModerationUserCommunicationDisabled"] = 145] = "AutoModerationUserCommunicationDisabled";
      AuditLogEvent3[AuditLogEvent3["AutoModerationQuarantineUser"] = 146] = "AutoModerationQuarantineUser";
      AuditLogEvent3[AuditLogEvent3["CreatorMonetizationRequestCreated"] = 150] = "CreatorMonetizationRequestCreated";
      AuditLogEvent3[AuditLogEvent3["CreatorMonetizationTermsAccepted"] = 151] = "CreatorMonetizationTermsAccepted";
      AuditLogEvent3[AuditLogEvent3["OnboardingPromptCreate"] = 163] = "OnboardingPromptCreate";
      AuditLogEvent3[AuditLogEvent3["OnboardingPromptUpdate"] = 164] = "OnboardingPromptUpdate";
      AuditLogEvent3[AuditLogEvent3["OnboardingPromptDelete"] = 165] = "OnboardingPromptDelete";
      AuditLogEvent3[AuditLogEvent3["OnboardingCreate"] = 166] = "OnboardingCreate";
      AuditLogEvent3[AuditLogEvent3["OnboardingUpdate"] = 167] = "OnboardingUpdate";
      AuditLogEvent3[AuditLogEvent3["HomeSettingsCreate"] = 190] = "HomeSettingsCreate";
      AuditLogEvent3[AuditLogEvent3["HomeSettingsUpdate"] = 191] = "HomeSettingsUpdate";
      AuditLogEvent3[AuditLogEvent3["VoiceChannelStatusCreate"] = 192] = "VoiceChannelStatusCreate";
      AuditLogEvent3[AuditLogEvent3["VoiceChannelStatusDelete"] = 193] = "VoiceChannelStatusDelete";
    })(AuditLogEvent2 || (exports2.AuditLogEvent = AuditLogEvent2 = {}));
    var AuditLogOptionsType2;
    (function(AuditLogOptionsType3) {
      AuditLogOptionsType3["Role"] = "0";
      AuditLogOptionsType3["Member"] = "1";
    })(AuditLogOptionsType2 || (exports2.AuditLogOptionsType = AuditLogOptionsType2 = {}));
  }
});

// node_modules/discord-api-types/payloads/v10/autoModeration.js
var require_autoModeration = __commonJS({
  "node_modules/discord-api-types/payloads/v10/autoModeration.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.AutoModerationActionType = exports2.AutoModerationRuleEventType = exports2.AutoModerationRuleKeywordPresetType = exports2.AutoModerationRuleTriggerType = void 0;
    var AutoModerationRuleTriggerType2;
    (function(AutoModerationRuleTriggerType3) {
      AutoModerationRuleTriggerType3[AutoModerationRuleTriggerType3["Keyword"] = 1] = "Keyword";
      AutoModerationRuleTriggerType3[AutoModerationRuleTriggerType3["Spam"] = 3] = "Spam";
      AutoModerationRuleTriggerType3[AutoModerationRuleTriggerType3["KeywordPreset"] = 4] = "KeywordPreset";
      AutoModerationRuleTriggerType3[AutoModerationRuleTriggerType3["MentionSpam"] = 5] = "MentionSpam";
      AutoModerationRuleTriggerType3[AutoModerationRuleTriggerType3["MemberProfile"] = 6] = "MemberProfile";
    })(AutoModerationRuleTriggerType2 || (exports2.AutoModerationRuleTriggerType = AutoModerationRuleTriggerType2 = {}));
    var AutoModerationRuleKeywordPresetType2;
    (function(AutoModerationRuleKeywordPresetType3) {
      AutoModerationRuleKeywordPresetType3[AutoModerationRuleKeywordPresetType3["Profanity"] = 1] = "Profanity";
      AutoModerationRuleKeywordPresetType3[AutoModerationRuleKeywordPresetType3["SexualContent"] = 2] = "SexualContent";
      AutoModerationRuleKeywordPresetType3[AutoModerationRuleKeywordPresetType3["Slurs"] = 3] = "Slurs";
    })(AutoModerationRuleKeywordPresetType2 || (exports2.AutoModerationRuleKeywordPresetType = AutoModerationRuleKeywordPresetType2 = {}));
    var AutoModerationRuleEventType2;
    (function(AutoModerationRuleEventType3) {
      AutoModerationRuleEventType3[AutoModerationRuleEventType3["MessageSend"] = 1] = "MessageSend";
      AutoModerationRuleEventType3[AutoModerationRuleEventType3["MemberUpdate"] = 2] = "MemberUpdate";
    })(AutoModerationRuleEventType2 || (exports2.AutoModerationRuleEventType = AutoModerationRuleEventType2 = {}));
    var AutoModerationActionType2;
    (function(AutoModerationActionType3) {
      AutoModerationActionType3[AutoModerationActionType3["BlockMessage"] = 1] = "BlockMessage";
      AutoModerationActionType3[AutoModerationActionType3["SendAlertMessage"] = 2] = "SendAlertMessage";
      AutoModerationActionType3[AutoModerationActionType3["Timeout"] = 3] = "Timeout";
      AutoModerationActionType3[AutoModerationActionType3["BlockMemberInteraction"] = 4] = "BlockMemberInteraction";
    })(AutoModerationActionType2 || (exports2.AutoModerationActionType = AutoModerationActionType2 = {}));
  }
});

// node_modules/discord-api-types/payloads/v10/channel.js
var require_channel = __commonJS({
  "node_modules/discord-api-types/payloads/v10/channel.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ChannelFlags = exports2.ThreadMemberFlags = exports2.ThreadAutoArchiveDuration = exports2.OverwriteType = exports2.VideoQualityMode = exports2.ChannelType = exports2.ForumLayoutType = exports2.SortOrderType = void 0;
    var SortOrderType2;
    (function(SortOrderType3) {
      SortOrderType3[SortOrderType3["LatestActivity"] = 0] = "LatestActivity";
      SortOrderType3[SortOrderType3["CreationDate"] = 1] = "CreationDate";
    })(SortOrderType2 || (exports2.SortOrderType = SortOrderType2 = {}));
    var ForumLayoutType2;
    (function(ForumLayoutType3) {
      ForumLayoutType3[ForumLayoutType3["NotSet"] = 0] = "NotSet";
      ForumLayoutType3[ForumLayoutType3["ListView"] = 1] = "ListView";
      ForumLayoutType3[ForumLayoutType3["GalleryView"] = 2] = "GalleryView";
    })(ForumLayoutType2 || (exports2.ForumLayoutType = ForumLayoutType2 = {}));
    var ChannelType2;
    (function(ChannelType3) {
      ChannelType3[ChannelType3["GuildText"] = 0] = "GuildText";
      ChannelType3[ChannelType3["DM"] = 1] = "DM";
      ChannelType3[ChannelType3["GuildVoice"] = 2] = "GuildVoice";
      ChannelType3[ChannelType3["GroupDM"] = 3] = "GroupDM";
      ChannelType3[ChannelType3["GuildCategory"] = 4] = "GuildCategory";
      ChannelType3[ChannelType3["GuildAnnouncement"] = 5] = "GuildAnnouncement";
      ChannelType3[ChannelType3["AnnouncementThread"] = 10] = "AnnouncementThread";
      ChannelType3[ChannelType3["PublicThread"] = 11] = "PublicThread";
      ChannelType3[ChannelType3["PrivateThread"] = 12] = "PrivateThread";
      ChannelType3[ChannelType3["GuildStageVoice"] = 13] = "GuildStageVoice";
      ChannelType3[ChannelType3["GuildDirectory"] = 14] = "GuildDirectory";
      ChannelType3[ChannelType3["GuildForum"] = 15] = "GuildForum";
      ChannelType3[ChannelType3["GuildMedia"] = 16] = "GuildMedia";
      ChannelType3[ChannelType3["GuildNews"] = 5] = "GuildNews";
      ChannelType3[ChannelType3["GuildNewsThread"] = 10] = "GuildNewsThread";
      ChannelType3[ChannelType3["GuildPublicThread"] = 11] = "GuildPublicThread";
      ChannelType3[ChannelType3["GuildPrivateThread"] = 12] = "GuildPrivateThread";
    })(ChannelType2 || (exports2.ChannelType = ChannelType2 = {}));
    var VideoQualityMode2;
    (function(VideoQualityMode3) {
      VideoQualityMode3[VideoQualityMode3["Auto"] = 1] = "Auto";
      VideoQualityMode3[VideoQualityMode3["Full"] = 2] = "Full";
    })(VideoQualityMode2 || (exports2.VideoQualityMode = VideoQualityMode2 = {}));
    var OverwriteType2;
    (function(OverwriteType3) {
      OverwriteType3[OverwriteType3["Role"] = 0] = "Role";
      OverwriteType3[OverwriteType3["Member"] = 1] = "Member";
    })(OverwriteType2 || (exports2.OverwriteType = OverwriteType2 = {}));
    var ThreadAutoArchiveDuration2;
    (function(ThreadAutoArchiveDuration3) {
      ThreadAutoArchiveDuration3[ThreadAutoArchiveDuration3["OneHour"] = 60] = "OneHour";
      ThreadAutoArchiveDuration3[ThreadAutoArchiveDuration3["OneDay"] = 1440] = "OneDay";
      ThreadAutoArchiveDuration3[ThreadAutoArchiveDuration3["ThreeDays"] = 4320] = "ThreeDays";
      ThreadAutoArchiveDuration3[ThreadAutoArchiveDuration3["OneWeek"] = 10080] = "OneWeek";
    })(ThreadAutoArchiveDuration2 || (exports2.ThreadAutoArchiveDuration = ThreadAutoArchiveDuration2 = {}));
    var ThreadMemberFlags2;
    (function(ThreadMemberFlags3) {
      ThreadMemberFlags3[ThreadMemberFlags3["HasInteracted"] = 1] = "HasInteracted";
      ThreadMemberFlags3[ThreadMemberFlags3["AllMessages"] = 2] = "AllMessages";
      ThreadMemberFlags3[ThreadMemberFlags3["OnlyMentions"] = 4] = "OnlyMentions";
      ThreadMemberFlags3[ThreadMemberFlags3["NoMessages"] = 8] = "NoMessages";
    })(ThreadMemberFlags2 || (exports2.ThreadMemberFlags = ThreadMemberFlags2 = {}));
    var ChannelFlags2;
    (function(ChannelFlags3) {
      ChannelFlags3[ChannelFlags3["GuildFeedRemoved"] = 1] = "GuildFeedRemoved";
      ChannelFlags3[ChannelFlags3["Pinned"] = 2] = "Pinned";
      ChannelFlags3[ChannelFlags3["ActiveChannelsRemoved"] = 4] = "ActiveChannelsRemoved";
      ChannelFlags3[ChannelFlags3["RequireTag"] = 16] = "RequireTag";
      ChannelFlags3[ChannelFlags3["IsSpam"] = 32] = "IsSpam";
      ChannelFlags3[ChannelFlags3["IsGuildResourceChannel"] = 128] = "IsGuildResourceChannel";
      ChannelFlags3[ChannelFlags3["ClydeAI"] = 256] = "ClydeAI";
      ChannelFlags3[ChannelFlags3["IsScheduledForDeletion"] = 512] = "IsScheduledForDeletion";
      ChannelFlags3[ChannelFlags3["HideMediaDownloadOptions"] = 32768] = "HideMediaDownloadOptions";
      ChannelFlags3[ChannelFlags3["IsSpoilerChannel"] = 2097152] = "IsSpoilerChannel";
    })(ChannelFlags2 || (exports2.ChannelFlags = ChannelFlags2 = {}));
  }
});

// node_modules/discord-api-types/payloads/v10/gateway.js
var require_gateway = __commonJS({
  "node_modules/discord-api-types/payloads/v10/gateway.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ActivityFlags = exports2.StatusDisplayType = exports2.ActivityType = exports2.ActivityPlatform = exports2.PresenceUpdateStatus = void 0;
    var PresenceUpdateStatus2;
    (function(PresenceUpdateStatus3) {
      PresenceUpdateStatus3["Online"] = "online";
      PresenceUpdateStatus3["DoNotDisturb"] = "dnd";
      PresenceUpdateStatus3["Idle"] = "idle";
      PresenceUpdateStatus3["Invisible"] = "invisible";
      PresenceUpdateStatus3["Offline"] = "offline";
    })(PresenceUpdateStatus2 || (exports2.PresenceUpdateStatus = PresenceUpdateStatus2 = {}));
    var ActivityPlatform2;
    (function(ActivityPlatform3) {
      ActivityPlatform3["Desktop"] = "desktop";
      ActivityPlatform3["Xbox"] = "xbox";
      ActivityPlatform3["Samsung"] = "samsung";
      ActivityPlatform3["IOS"] = "ios";
      ActivityPlatform3["Android"] = "android";
      ActivityPlatform3["Embedded"] = "embedded";
      ActivityPlatform3["PS4"] = "ps4";
      ActivityPlatform3["PS5"] = "ps5";
    })(ActivityPlatform2 || (exports2.ActivityPlatform = ActivityPlatform2 = {}));
    var ActivityType2;
    (function(ActivityType3) {
      ActivityType3[ActivityType3["Playing"] = 0] = "Playing";
      ActivityType3[ActivityType3["Streaming"] = 1] = "Streaming";
      ActivityType3[ActivityType3["Listening"] = 2] = "Listening";
      ActivityType3[ActivityType3["Watching"] = 3] = "Watching";
      ActivityType3[ActivityType3["Custom"] = 4] = "Custom";
      ActivityType3[ActivityType3["Competing"] = 5] = "Competing";
    })(ActivityType2 || (exports2.ActivityType = ActivityType2 = {}));
    var StatusDisplayType2;
    (function(StatusDisplayType3) {
      StatusDisplayType3[StatusDisplayType3["Name"] = 0] = "Name";
      StatusDisplayType3[StatusDisplayType3["State"] = 1] = "State";
      StatusDisplayType3[StatusDisplayType3["Details"] = 2] = "Details";
    })(StatusDisplayType2 || (exports2.StatusDisplayType = StatusDisplayType2 = {}));
    var ActivityFlags2;
    (function(ActivityFlags3) {
      ActivityFlags3[ActivityFlags3["Instance"] = 1] = "Instance";
      ActivityFlags3[ActivityFlags3["Join"] = 2] = "Join";
      ActivityFlags3[ActivityFlags3["Spectate"] = 4] = "Spectate";
      ActivityFlags3[ActivityFlags3["JoinRequest"] = 8] = "JoinRequest";
      ActivityFlags3[ActivityFlags3["Sync"] = 16] = "Sync";
      ActivityFlags3[ActivityFlags3["Play"] = 32] = "Play";
      ActivityFlags3[ActivityFlags3["PartyPrivacyFriends"] = 64] = "PartyPrivacyFriends";
      ActivityFlags3[ActivityFlags3["PartyPrivacyVoiceChannel"] = 128] = "PartyPrivacyVoiceChannel";
      ActivityFlags3[ActivityFlags3["Embedded"] = 256] = "Embedded";
    })(ActivityFlags2 || (exports2.ActivityFlags = ActivityFlags2 = {}));
  }
});

// node_modules/discord-api-types/payloads/v10/guild.js
var require_guild = __commonJS({
  "node_modules/discord-api-types/payloads/v10/guild.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.GuildOnboardingPromptType = exports2.GuildOnboardingMode = exports2.MembershipScreeningFieldType = exports2.GuildWidgetStyle = exports2.IntegrationExpireBehavior = exports2.GuildMemberFlags = exports2.GuildFeature = exports2.GuildSystemChannelFlags = exports2.GuildHubType = exports2.GuildPremiumTier = exports2.GuildVerificationLevel = exports2.GuildNSFWLevel = exports2.GuildMFALevel = exports2.GuildExplicitContentFilter = exports2.GuildDefaultMessageNotifications = void 0;
    var GuildDefaultMessageNotifications2;
    (function(GuildDefaultMessageNotifications3) {
      GuildDefaultMessageNotifications3[GuildDefaultMessageNotifications3["AllMessages"] = 0] = "AllMessages";
      GuildDefaultMessageNotifications3[GuildDefaultMessageNotifications3["OnlyMentions"] = 1] = "OnlyMentions";
    })(GuildDefaultMessageNotifications2 || (exports2.GuildDefaultMessageNotifications = GuildDefaultMessageNotifications2 = {}));
    var GuildExplicitContentFilter2;
    (function(GuildExplicitContentFilter3) {
      GuildExplicitContentFilter3[GuildExplicitContentFilter3["Disabled"] = 0] = "Disabled";
      GuildExplicitContentFilter3[GuildExplicitContentFilter3["MembersWithoutRoles"] = 1] = "MembersWithoutRoles";
      GuildExplicitContentFilter3[GuildExplicitContentFilter3["AllMembers"] = 2] = "AllMembers";
    })(GuildExplicitContentFilter2 || (exports2.GuildExplicitContentFilter = GuildExplicitContentFilter2 = {}));
    var GuildMFALevel2;
    (function(GuildMFALevel3) {
      GuildMFALevel3[GuildMFALevel3["None"] = 0] = "None";
      GuildMFALevel3[GuildMFALevel3["Elevated"] = 1] = "Elevated";
    })(GuildMFALevel2 || (exports2.GuildMFALevel = GuildMFALevel2 = {}));
    var GuildNSFWLevel2;
    (function(GuildNSFWLevel3) {
      GuildNSFWLevel3[GuildNSFWLevel3["Default"] = 0] = "Default";
      GuildNSFWLevel3[GuildNSFWLevel3["Explicit"] = 1] = "Explicit";
      GuildNSFWLevel3[GuildNSFWLevel3["Safe"] = 2] = "Safe";
      GuildNSFWLevel3[GuildNSFWLevel3["AgeRestricted"] = 3] = "AgeRestricted";
    })(GuildNSFWLevel2 || (exports2.GuildNSFWLevel = GuildNSFWLevel2 = {}));
    var GuildVerificationLevel2;
    (function(GuildVerificationLevel3) {
      GuildVerificationLevel3[GuildVerificationLevel3["None"] = 0] = "None";
      GuildVerificationLevel3[GuildVerificationLevel3["Low"] = 1] = "Low";
      GuildVerificationLevel3[GuildVerificationLevel3["Medium"] = 2] = "Medium";
      GuildVerificationLevel3[GuildVerificationLevel3["High"] = 3] = "High";
      GuildVerificationLevel3[GuildVerificationLevel3["VeryHigh"] = 4] = "VeryHigh";
    })(GuildVerificationLevel2 || (exports2.GuildVerificationLevel = GuildVerificationLevel2 = {}));
    var GuildPremiumTier2;
    (function(GuildPremiumTier3) {
      GuildPremiumTier3[GuildPremiumTier3["None"] = 0] = "None";
      GuildPremiumTier3[GuildPremiumTier3["Tier1"] = 1] = "Tier1";
      GuildPremiumTier3[GuildPremiumTier3["Tier2"] = 2] = "Tier2";
      GuildPremiumTier3[GuildPremiumTier3["Tier3"] = 3] = "Tier3";
    })(GuildPremiumTier2 || (exports2.GuildPremiumTier = GuildPremiumTier2 = {}));
    var GuildHubType2;
    (function(GuildHubType3) {
      GuildHubType3[GuildHubType3["Default"] = 0] = "Default";
      GuildHubType3[GuildHubType3["HighSchool"] = 1] = "HighSchool";
      GuildHubType3[GuildHubType3["College"] = 2] = "College";
    })(GuildHubType2 || (exports2.GuildHubType = GuildHubType2 = {}));
    var GuildSystemChannelFlags2;
    (function(GuildSystemChannelFlags3) {
      GuildSystemChannelFlags3[GuildSystemChannelFlags3["SuppressJoinNotifications"] = 1] = "SuppressJoinNotifications";
      GuildSystemChannelFlags3[GuildSystemChannelFlags3["SuppressPremiumSubscriptions"] = 2] = "SuppressPremiumSubscriptions";
      GuildSystemChannelFlags3[GuildSystemChannelFlags3["SuppressGuildReminderNotifications"] = 4] = "SuppressGuildReminderNotifications";
      GuildSystemChannelFlags3[GuildSystemChannelFlags3["SuppressJoinNotificationReplies"] = 8] = "SuppressJoinNotificationReplies";
      GuildSystemChannelFlags3[GuildSystemChannelFlags3["SuppressRoleSubscriptionPurchaseNotifications"] = 16] = "SuppressRoleSubscriptionPurchaseNotifications";
      GuildSystemChannelFlags3[GuildSystemChannelFlags3["SuppressRoleSubscriptionPurchaseNotificationReplies"] = 32] = "SuppressRoleSubscriptionPurchaseNotificationReplies";
    })(GuildSystemChannelFlags2 || (exports2.GuildSystemChannelFlags = GuildSystemChannelFlags2 = {}));
    var GuildFeature2;
    (function(GuildFeature3) {
      GuildFeature3["AnimatedBanner"] = "ANIMATED_BANNER";
      GuildFeature3["AnimatedIcon"] = "ANIMATED_ICON";
      GuildFeature3["ApplicationCommandPermissionsV2"] = "APPLICATION_COMMAND_PERMISSIONS_V2";
      GuildFeature3["AutoModeration"] = "AUTO_MODERATION";
      GuildFeature3["Banner"] = "BANNER";
      GuildFeature3["Community"] = "COMMUNITY";
      GuildFeature3["CreatorMonetizableProvisional"] = "CREATOR_MONETIZABLE_PROVISIONAL";
      GuildFeature3["CreatorStorePage"] = "CREATOR_STORE_PAGE";
      GuildFeature3["DeveloperSupportServer"] = "DEVELOPER_SUPPORT_SERVER";
      GuildFeature3["Discoverable"] = "DISCOVERABLE";
      GuildFeature3["Featurable"] = "FEATURABLE";
      GuildFeature3["HasDirectoryEntry"] = "HAS_DIRECTORY_ENTRY";
      GuildFeature3["Hub"] = "HUB";
      GuildFeature3["InvitesDisabled"] = "INVITES_DISABLED";
      GuildFeature3["InviteSplash"] = "INVITE_SPLASH";
      GuildFeature3["LinkedToHub"] = "LINKED_TO_HUB";
      GuildFeature3["MemberVerificationGateEnabled"] = "MEMBER_VERIFICATION_GATE_ENABLED";
      GuildFeature3["MoreSoundboard"] = "MORE_SOUNDBOARD";
      GuildFeature3["MonetizationEnabled"] = "MONETIZATION_ENABLED";
      GuildFeature3["MoreStickers"] = "MORE_STICKERS";
      GuildFeature3["News"] = "NEWS";
      GuildFeature3["Partnered"] = "PARTNERED";
      GuildFeature3["PreviewEnabled"] = "PREVIEW_ENABLED";
      GuildFeature3["PrivateThreads"] = "PRIVATE_THREADS";
      GuildFeature3["RaidAlertsDisabled"] = "RAID_ALERTS_DISABLED";
      GuildFeature3["RelayEnabled"] = "RELAY_ENABLED";
      GuildFeature3["RoleIcons"] = "ROLE_ICONS";
      GuildFeature3["RoleSubscriptionsAvailableForPurchase"] = "ROLE_SUBSCRIPTIONS_AVAILABLE_FOR_PURCHASE";
      GuildFeature3["RoleSubscriptionsEnabled"] = "ROLE_SUBSCRIPTIONS_ENABLED";
      GuildFeature3["Soundboard"] = "SOUNDBOARD";
      GuildFeature3["TicketedEventsEnabled"] = "TICKETED_EVENTS_ENABLED";
      GuildFeature3["VanityURL"] = "VANITY_URL";
      GuildFeature3["Verified"] = "VERIFIED";
      GuildFeature3["VIPRegions"] = "VIP_REGIONS";
      GuildFeature3["WelcomeScreenEnabled"] = "WELCOME_SCREEN_ENABLED";
      GuildFeature3["GuildTags"] = "GUILD_TAGS";
      GuildFeature3["EnhancedRoleColors"] = "ENHANCED_ROLE_COLORS";
      GuildFeature3["GuestsEnabled"] = "GUESTS_ENABLED";
      GuildFeature3["PinPermissionMigrationComplete"] = "PIN_PERMISSION_MIGRATION_COMPLETE";
    })(GuildFeature2 || (exports2.GuildFeature = GuildFeature2 = {}));
    var GuildMemberFlags2;
    (function(GuildMemberFlags3) {
      GuildMemberFlags3[GuildMemberFlags3["DidRejoin"] = 1] = "DidRejoin";
      GuildMemberFlags3[GuildMemberFlags3["CompletedOnboarding"] = 2] = "CompletedOnboarding";
      GuildMemberFlags3[GuildMemberFlags3["BypassesVerification"] = 4] = "BypassesVerification";
      GuildMemberFlags3[GuildMemberFlags3["StartedOnboarding"] = 8] = "StartedOnboarding";
      GuildMemberFlags3[GuildMemberFlags3["IsGuest"] = 16] = "IsGuest";
      GuildMemberFlags3[GuildMemberFlags3["StartedHomeActions"] = 32] = "StartedHomeActions";
      GuildMemberFlags3[GuildMemberFlags3["CompletedHomeActions"] = 64] = "CompletedHomeActions";
      GuildMemberFlags3[GuildMemberFlags3["AutomodQuarantinedUsernameOrGuildNickname"] = 128] = "AutomodQuarantinedUsernameOrGuildNickname";
      GuildMemberFlags3[GuildMemberFlags3["AutomodQuarantinedBio"] = 256] = "AutomodQuarantinedBio";
      GuildMemberFlags3[GuildMemberFlags3["DmSettingsUpsellAcknowledged"] = 512] = "DmSettingsUpsellAcknowledged";
      GuildMemberFlags3[GuildMemberFlags3["AutoModQuarantinedGuildTag"] = 1024] = "AutoModQuarantinedGuildTag";
    })(GuildMemberFlags2 || (exports2.GuildMemberFlags = GuildMemberFlags2 = {}));
    var IntegrationExpireBehavior2;
    (function(IntegrationExpireBehavior3) {
      IntegrationExpireBehavior3[IntegrationExpireBehavior3["RemoveRole"] = 0] = "RemoveRole";
      IntegrationExpireBehavior3[IntegrationExpireBehavior3["Kick"] = 1] = "Kick";
    })(IntegrationExpireBehavior2 || (exports2.IntegrationExpireBehavior = IntegrationExpireBehavior2 = {}));
    var GuildWidgetStyle2;
    (function(GuildWidgetStyle3) {
      GuildWidgetStyle3["Shield"] = "shield";
      GuildWidgetStyle3["Banner1"] = "banner1";
      GuildWidgetStyle3["Banner2"] = "banner2";
      GuildWidgetStyle3["Banner3"] = "banner3";
      GuildWidgetStyle3["Banner4"] = "banner4";
    })(GuildWidgetStyle2 || (exports2.GuildWidgetStyle = GuildWidgetStyle2 = {}));
    var MembershipScreeningFieldType2;
    (function(MembershipScreeningFieldType3) {
      MembershipScreeningFieldType3["Terms"] = "TERMS";
    })(MembershipScreeningFieldType2 || (exports2.MembershipScreeningFieldType = MembershipScreeningFieldType2 = {}));
    var GuildOnboardingMode2;
    (function(GuildOnboardingMode3) {
      GuildOnboardingMode3[GuildOnboardingMode3["OnboardingDefault"] = 0] = "OnboardingDefault";
      GuildOnboardingMode3[GuildOnboardingMode3["OnboardingAdvanced"] = 1] = "OnboardingAdvanced";
    })(GuildOnboardingMode2 || (exports2.GuildOnboardingMode = GuildOnboardingMode2 = {}));
    var GuildOnboardingPromptType2;
    (function(GuildOnboardingPromptType3) {
      GuildOnboardingPromptType3[GuildOnboardingPromptType3["MultipleChoice"] = 0] = "MultipleChoice";
      GuildOnboardingPromptType3[GuildOnboardingPromptType3["Dropdown"] = 1] = "Dropdown";
    })(GuildOnboardingPromptType2 || (exports2.GuildOnboardingPromptType = GuildOnboardingPromptType2 = {}));
  }
});

// node_modules/discord-api-types/payloads/v10/guildScheduledEvent.js
var require_guildScheduledEvent = __commonJS({
  "node_modules/discord-api-types/payloads/v10/guildScheduledEvent.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.GuildScheduledEventPrivacyLevel = exports2.GuildScheduledEventStatus = exports2.GuildScheduledEventEntityType = exports2.GuildScheduledEventRecurrenceRuleMonth = exports2.GuildScheduledEventRecurrenceRuleWeekday = exports2.GuildScheduledEventRecurrenceRuleFrequency = void 0;
    var GuildScheduledEventRecurrenceRuleFrequency2;
    (function(GuildScheduledEventRecurrenceRuleFrequency3) {
      GuildScheduledEventRecurrenceRuleFrequency3[GuildScheduledEventRecurrenceRuleFrequency3["Yearly"] = 0] = "Yearly";
      GuildScheduledEventRecurrenceRuleFrequency3[GuildScheduledEventRecurrenceRuleFrequency3["Monthly"] = 1] = "Monthly";
      GuildScheduledEventRecurrenceRuleFrequency3[GuildScheduledEventRecurrenceRuleFrequency3["Weekly"] = 2] = "Weekly";
      GuildScheduledEventRecurrenceRuleFrequency3[GuildScheduledEventRecurrenceRuleFrequency3["Daily"] = 3] = "Daily";
    })(GuildScheduledEventRecurrenceRuleFrequency2 || (exports2.GuildScheduledEventRecurrenceRuleFrequency = GuildScheduledEventRecurrenceRuleFrequency2 = {}));
    var GuildScheduledEventRecurrenceRuleWeekday2;
    (function(GuildScheduledEventRecurrenceRuleWeekday3) {
      GuildScheduledEventRecurrenceRuleWeekday3[GuildScheduledEventRecurrenceRuleWeekday3["Monday"] = 0] = "Monday";
      GuildScheduledEventRecurrenceRuleWeekday3[GuildScheduledEventRecurrenceRuleWeekday3["Tuesday"] = 1] = "Tuesday";
      GuildScheduledEventRecurrenceRuleWeekday3[GuildScheduledEventRecurrenceRuleWeekday3["Wednesday"] = 2] = "Wednesday";
      GuildScheduledEventRecurrenceRuleWeekday3[GuildScheduledEventRecurrenceRuleWeekday3["Thursday"] = 3] = "Thursday";
      GuildScheduledEventRecurrenceRuleWeekday3[GuildScheduledEventRecurrenceRuleWeekday3["Friday"] = 4] = "Friday";
      GuildScheduledEventRecurrenceRuleWeekday3[GuildScheduledEventRecurrenceRuleWeekday3["Saturday"] = 5] = "Saturday";
      GuildScheduledEventRecurrenceRuleWeekday3[GuildScheduledEventRecurrenceRuleWeekday3["Sunday"] = 6] = "Sunday";
    })(GuildScheduledEventRecurrenceRuleWeekday2 || (exports2.GuildScheduledEventRecurrenceRuleWeekday = GuildScheduledEventRecurrenceRuleWeekday2 = {}));
    var GuildScheduledEventRecurrenceRuleMonth2;
    (function(GuildScheduledEventRecurrenceRuleMonth3) {
      GuildScheduledEventRecurrenceRuleMonth3[GuildScheduledEventRecurrenceRuleMonth3["January"] = 1] = "January";
      GuildScheduledEventRecurrenceRuleMonth3[GuildScheduledEventRecurrenceRuleMonth3["February"] = 2] = "February";
      GuildScheduledEventRecurrenceRuleMonth3[GuildScheduledEventRecurrenceRuleMonth3["March"] = 3] = "March";
      GuildScheduledEventRecurrenceRuleMonth3[GuildScheduledEventRecurrenceRuleMonth3["April"] = 4] = "April";
      GuildScheduledEventRecurrenceRuleMonth3[GuildScheduledEventRecurrenceRuleMonth3["May"] = 5] = "May";
      GuildScheduledEventRecurrenceRuleMonth3[GuildScheduledEventRecurrenceRuleMonth3["June"] = 6] = "June";
      GuildScheduledEventRecurrenceRuleMonth3[GuildScheduledEventRecurrenceRuleMonth3["July"] = 7] = "July";
      GuildScheduledEventRecurrenceRuleMonth3[GuildScheduledEventRecurrenceRuleMonth3["August"] = 8] = "August";
      GuildScheduledEventRecurrenceRuleMonth3[GuildScheduledEventRecurrenceRuleMonth3["September"] = 9] = "September";
      GuildScheduledEventRecurrenceRuleMonth3[GuildScheduledEventRecurrenceRuleMonth3["October"] = 10] = "October";
      GuildScheduledEventRecurrenceRuleMonth3[GuildScheduledEventRecurrenceRuleMonth3["November"] = 11] = "November";
      GuildScheduledEventRecurrenceRuleMonth3[GuildScheduledEventRecurrenceRuleMonth3["December"] = 12] = "December";
    })(GuildScheduledEventRecurrenceRuleMonth2 || (exports2.GuildScheduledEventRecurrenceRuleMonth = GuildScheduledEventRecurrenceRuleMonth2 = {}));
    var GuildScheduledEventEntityType2;
    (function(GuildScheduledEventEntityType3) {
      GuildScheduledEventEntityType3[GuildScheduledEventEntityType3["StageInstance"] = 1] = "StageInstance";
      GuildScheduledEventEntityType3[GuildScheduledEventEntityType3["Voice"] = 2] = "Voice";
      GuildScheduledEventEntityType3[GuildScheduledEventEntityType3["External"] = 3] = "External";
    })(GuildScheduledEventEntityType2 || (exports2.GuildScheduledEventEntityType = GuildScheduledEventEntityType2 = {}));
    var GuildScheduledEventStatus2;
    (function(GuildScheduledEventStatus3) {
      GuildScheduledEventStatus3[GuildScheduledEventStatus3["Scheduled"] = 1] = "Scheduled";
      GuildScheduledEventStatus3[GuildScheduledEventStatus3["Active"] = 2] = "Active";
      GuildScheduledEventStatus3[GuildScheduledEventStatus3["Completed"] = 3] = "Completed";
      GuildScheduledEventStatus3[GuildScheduledEventStatus3["Canceled"] = 4] = "Canceled";
    })(GuildScheduledEventStatus2 || (exports2.GuildScheduledEventStatus = GuildScheduledEventStatus2 = {}));
    var GuildScheduledEventPrivacyLevel2;
    (function(GuildScheduledEventPrivacyLevel3) {
      GuildScheduledEventPrivacyLevel3[GuildScheduledEventPrivacyLevel3["GuildOnly"] = 2] = "GuildOnly";
    })(GuildScheduledEventPrivacyLevel2 || (exports2.GuildScheduledEventPrivacyLevel = GuildScheduledEventPrivacyLevel2 = {}));
  }
});

// node_modules/discord-api-types/payloads/v10/_interactions/_applicationCommands/_chatInput/shared.js
var require_shared = __commonJS({
  "node_modules/discord-api-types/payloads/v10/_interactions/_applicationCommands/_chatInput/shared.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ApplicationCommandOptionType = void 0;
    var ApplicationCommandOptionType2;
    (function(ApplicationCommandOptionType3) {
      ApplicationCommandOptionType3[ApplicationCommandOptionType3["Subcommand"] = 1] = "Subcommand";
      ApplicationCommandOptionType3[ApplicationCommandOptionType3["SubcommandGroup"] = 2] = "SubcommandGroup";
      ApplicationCommandOptionType3[ApplicationCommandOptionType3["String"] = 3] = "String";
      ApplicationCommandOptionType3[ApplicationCommandOptionType3["Integer"] = 4] = "Integer";
      ApplicationCommandOptionType3[ApplicationCommandOptionType3["Boolean"] = 5] = "Boolean";
      ApplicationCommandOptionType3[ApplicationCommandOptionType3["User"] = 6] = "User";
      ApplicationCommandOptionType3[ApplicationCommandOptionType3["Channel"] = 7] = "Channel";
      ApplicationCommandOptionType3[ApplicationCommandOptionType3["Role"] = 8] = "Role";
      ApplicationCommandOptionType3[ApplicationCommandOptionType3["Mentionable"] = 9] = "Mentionable";
      ApplicationCommandOptionType3[ApplicationCommandOptionType3["Number"] = 10] = "Number";
      ApplicationCommandOptionType3[ApplicationCommandOptionType3["Attachment"] = 11] = "Attachment";
    })(ApplicationCommandOptionType2 || (exports2.ApplicationCommandOptionType = ApplicationCommandOptionType2 = {}));
  }
});

// node_modules/discord-api-types/payloads/v10/_interactions/_applicationCommands/chatInput.js
var require_chatInput = __commonJS({
  "node_modules/discord-api-types/payloads/v10/_interactions/_applicationCommands/chatInput.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p)) __createBinding(exports3, m, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    __exportStar(require_shared(), exports2);
  }
});

// node_modules/discord-api-types/payloads/v10/_interactions/_applicationCommands/permissions.js
var require_permissions = __commonJS({
  "node_modules/discord-api-types/payloads/v10/_interactions/_applicationCommands/permissions.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.APIApplicationCommandPermissionsConstant = exports2.ApplicationCommandPermissionType = void 0;
    var ApplicationCommandPermissionType2;
    (function(ApplicationCommandPermissionType3) {
      ApplicationCommandPermissionType3[ApplicationCommandPermissionType3["Role"] = 1] = "Role";
      ApplicationCommandPermissionType3[ApplicationCommandPermissionType3["User"] = 2] = "User";
      ApplicationCommandPermissionType3[ApplicationCommandPermissionType3["Channel"] = 3] = "Channel";
    })(ApplicationCommandPermissionType2 || (exports2.ApplicationCommandPermissionType = ApplicationCommandPermissionType2 = {}));
    exports2.APIApplicationCommandPermissionsConstant = {
      // eslint-disable-next-line unicorn/prefer-native-coercion-functions
      Everyone: (guildId) => String(guildId),
      AllChannels: (guildId) => String(BigInt(guildId) - 1n)
    };
  }
});

// node_modules/discord-api-types/payloads/v10/_interactions/applicationCommands.js
var require_applicationCommands = __commonJS({
  "node_modules/discord-api-types/payloads/v10/_interactions/applicationCommands.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p)) __createBinding(exports3, m, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.EntryPointCommandHandlerType = exports2.InteractionContextType = exports2.ApplicationIntegrationType = exports2.ApplicationCommandType = void 0;
    __exportStar(require_chatInput(), exports2);
    __exportStar(require_permissions(), exports2);
    var ApplicationCommandType2;
    (function(ApplicationCommandType3) {
      ApplicationCommandType3[ApplicationCommandType3["ChatInput"] = 1] = "ChatInput";
      ApplicationCommandType3[ApplicationCommandType3["User"] = 2] = "User";
      ApplicationCommandType3[ApplicationCommandType3["Message"] = 3] = "Message";
      ApplicationCommandType3[ApplicationCommandType3["PrimaryEntryPoint"] = 4] = "PrimaryEntryPoint";
    })(ApplicationCommandType2 || (exports2.ApplicationCommandType = ApplicationCommandType2 = {}));
    var ApplicationIntegrationType2;
    (function(ApplicationIntegrationType3) {
      ApplicationIntegrationType3[ApplicationIntegrationType3["GuildInstall"] = 0] = "GuildInstall";
      ApplicationIntegrationType3[ApplicationIntegrationType3["UserInstall"] = 1] = "UserInstall";
    })(ApplicationIntegrationType2 || (exports2.ApplicationIntegrationType = ApplicationIntegrationType2 = {}));
    var InteractionContextType2;
    (function(InteractionContextType3) {
      InteractionContextType3[InteractionContextType3["Guild"] = 0] = "Guild";
      InteractionContextType3[InteractionContextType3["BotDM"] = 1] = "BotDM";
      InteractionContextType3[InteractionContextType3["PrivateChannel"] = 2] = "PrivateChannel";
    })(InteractionContextType2 || (exports2.InteractionContextType = InteractionContextType2 = {}));
    var EntryPointCommandHandlerType2;
    (function(EntryPointCommandHandlerType3) {
      EntryPointCommandHandlerType3[EntryPointCommandHandlerType3["AppHandler"] = 1] = "AppHandler";
      EntryPointCommandHandlerType3[EntryPointCommandHandlerType3["DiscordLaunchActivity"] = 2] = "DiscordLaunchActivity";
    })(EntryPointCommandHandlerType2 || (exports2.EntryPointCommandHandlerType = EntryPointCommandHandlerType2 = {}));
  }
});

// node_modules/discord-api-types/payloads/v10/_interactions/responses.js
var require_responses = __commonJS({
  "node_modules/discord-api-types/payloads/v10/_interactions/responses.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.InteractionResponseType = exports2.InteractionType = void 0;
    var InteractionType4;
    (function(InteractionType5) {
      InteractionType5[InteractionType5["Ping"] = 1] = "Ping";
      InteractionType5[InteractionType5["ApplicationCommand"] = 2] = "ApplicationCommand";
      InteractionType5[InteractionType5["MessageComponent"] = 3] = "MessageComponent";
      InteractionType5[InteractionType5["ApplicationCommandAutocomplete"] = 4] = "ApplicationCommandAutocomplete";
      InteractionType5[InteractionType5["ModalSubmit"] = 5] = "ModalSubmit";
    })(InteractionType4 || (exports2.InteractionType = InteractionType4 = {}));
    var InteractionResponseType2;
    (function(InteractionResponseType3) {
      InteractionResponseType3[InteractionResponseType3["Pong"] = 1] = "Pong";
      InteractionResponseType3[InteractionResponseType3["ChannelMessageWithSource"] = 4] = "ChannelMessageWithSource";
      InteractionResponseType3[InteractionResponseType3["DeferredChannelMessageWithSource"] = 5] = "DeferredChannelMessageWithSource";
      InteractionResponseType3[InteractionResponseType3["DeferredMessageUpdate"] = 6] = "DeferredMessageUpdate";
      InteractionResponseType3[InteractionResponseType3["UpdateMessage"] = 7] = "UpdateMessage";
      InteractionResponseType3[InteractionResponseType3["ApplicationCommandAutocompleteResult"] = 8] = "ApplicationCommandAutocompleteResult";
      InteractionResponseType3[InteractionResponseType3["Modal"] = 9] = "Modal";
      InteractionResponseType3[InteractionResponseType3["PremiumRequired"] = 10] = "PremiumRequired";
      InteractionResponseType3[InteractionResponseType3["LaunchActivity"] = 12] = "LaunchActivity";
    })(InteractionResponseType2 || (exports2.InteractionResponseType = InteractionResponseType2 = {}));
  }
});

// node_modules/discord-api-types/payloads/v10/interactions.js
var require_interactions = __commonJS({
  "node_modules/discord-api-types/payloads/v10/interactions.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p)) __createBinding(exports3, m, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    __exportStar(require_applicationCommands(), exports2);
    __exportStar(require_responses(), exports2);
  }
});

// node_modules/discord-api-types/payloads/v10/invite.js
var require_invite = __commonJS({
  "node_modules/discord-api-types/payloads/v10/invite.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.InviteTargetType = exports2.InviteType = exports2.InviteFlags = void 0;
    var InviteFlags2;
    (function(InviteFlags3) {
      InviteFlags3[InviteFlags3["IsGuestInvite"] = 1] = "IsGuestInvite";
    })(InviteFlags2 || (exports2.InviteFlags = InviteFlags2 = {}));
    var InviteType2;
    (function(InviteType3) {
      InviteType3[InviteType3["Guild"] = 0] = "Guild";
      InviteType3[InviteType3["GroupDM"] = 1] = "GroupDM";
      InviteType3[InviteType3["Friend"] = 2] = "Friend";
    })(InviteType2 || (exports2.InviteType = InviteType2 = {}));
    var InviteTargetType2;
    (function(InviteTargetType3) {
      InviteTargetType3[InviteTargetType3["Stream"] = 1] = "Stream";
      InviteTargetType3[InviteTargetType3["EmbeddedApplication"] = 2] = "EmbeddedApplication";
    })(InviteTargetType2 || (exports2.InviteTargetType = InviteTargetType2 = {}));
  }
});

// node_modules/discord-api-types/payloads/v10/message.js
var require_message = __commonJS({
  "node_modules/discord-api-types/payloads/v10/message.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.MessageSearchSortMode = exports2.MessageSearchEmbedType = exports2.MessageSearchHasType = exports2.MessageSearchAuthorType = exports2.SeparatorSpacingSize = exports2.UnfurledMediaItemFlags = exports2.UnfurledMediaItemLoadingState = exports2.SelectMenuDefaultValueType = exports2.TextInputStyle = exports2.ButtonStyle = exports2.ComponentType = exports2.AllowedMentionsTypes = exports2.AttachmentFlags = exports2.EmbedMediaFlags = exports2.EmbedFlags = exports2.EmbedType = exports2.BaseThemeType = exports2.MessageFlags = exports2.MessageReferenceType = exports2.MessageActivityType = exports2.MessageType = void 0;
    var MessageType2;
    (function(MessageType3) {
      MessageType3[MessageType3["Default"] = 0] = "Default";
      MessageType3[MessageType3["RecipientAdd"] = 1] = "RecipientAdd";
      MessageType3[MessageType3["RecipientRemove"] = 2] = "RecipientRemove";
      MessageType3[MessageType3["Call"] = 3] = "Call";
      MessageType3[MessageType3["ChannelNameChange"] = 4] = "ChannelNameChange";
      MessageType3[MessageType3["ChannelIconChange"] = 5] = "ChannelIconChange";
      MessageType3[MessageType3["ChannelPinnedMessage"] = 6] = "ChannelPinnedMessage";
      MessageType3[MessageType3["UserJoin"] = 7] = "UserJoin";
      MessageType3[MessageType3["GuildBoost"] = 8] = "GuildBoost";
      MessageType3[MessageType3["GuildBoostTier1"] = 9] = "GuildBoostTier1";
      MessageType3[MessageType3["GuildBoostTier2"] = 10] = "GuildBoostTier2";
      MessageType3[MessageType3["GuildBoostTier3"] = 11] = "GuildBoostTier3";
      MessageType3[MessageType3["ChannelFollowAdd"] = 12] = "ChannelFollowAdd";
      MessageType3[MessageType3["GuildDiscoveryDisqualified"] = 14] = "GuildDiscoveryDisqualified";
      MessageType3[MessageType3["GuildDiscoveryRequalified"] = 15] = "GuildDiscoveryRequalified";
      MessageType3[MessageType3["GuildDiscoveryGracePeriodInitialWarning"] = 16] = "GuildDiscoveryGracePeriodInitialWarning";
      MessageType3[MessageType3["GuildDiscoveryGracePeriodFinalWarning"] = 17] = "GuildDiscoveryGracePeriodFinalWarning";
      MessageType3[MessageType3["ThreadCreated"] = 18] = "ThreadCreated";
      MessageType3[MessageType3["Reply"] = 19] = "Reply";
      MessageType3[MessageType3["ChatInputCommand"] = 20] = "ChatInputCommand";
      MessageType3[MessageType3["ThreadStarterMessage"] = 21] = "ThreadStarterMessage";
      MessageType3[MessageType3["GuildInviteReminder"] = 22] = "GuildInviteReminder";
      MessageType3[MessageType3["ContextMenuCommand"] = 23] = "ContextMenuCommand";
      MessageType3[MessageType3["AutoModerationAction"] = 24] = "AutoModerationAction";
      MessageType3[MessageType3["RoleSubscriptionPurchase"] = 25] = "RoleSubscriptionPurchase";
      MessageType3[MessageType3["InteractionPremiumUpsell"] = 26] = "InteractionPremiumUpsell";
      MessageType3[MessageType3["StageStart"] = 27] = "StageStart";
      MessageType3[MessageType3["StageEnd"] = 28] = "StageEnd";
      MessageType3[MessageType3["StageSpeaker"] = 29] = "StageSpeaker";
      MessageType3[MessageType3["StageRaiseHand"] = 30] = "StageRaiseHand";
      MessageType3[MessageType3["StageTopic"] = 31] = "StageTopic";
      MessageType3[MessageType3["GuildApplicationPremiumSubscription"] = 32] = "GuildApplicationPremiumSubscription";
      MessageType3[MessageType3["GuildIncidentAlertModeEnabled"] = 36] = "GuildIncidentAlertModeEnabled";
      MessageType3[MessageType3["GuildIncidentAlertModeDisabled"] = 37] = "GuildIncidentAlertModeDisabled";
      MessageType3[MessageType3["GuildIncidentReportRaid"] = 38] = "GuildIncidentReportRaid";
      MessageType3[MessageType3["GuildIncidentReportFalseAlarm"] = 39] = "GuildIncidentReportFalseAlarm";
      MessageType3[MessageType3["PurchaseNotification"] = 44] = "PurchaseNotification";
      MessageType3[MessageType3["PollResult"] = 46] = "PollResult";
    })(MessageType2 || (exports2.MessageType = MessageType2 = {}));
    var MessageActivityType2;
    (function(MessageActivityType3) {
      MessageActivityType3[MessageActivityType3["Join"] = 1] = "Join";
      MessageActivityType3[MessageActivityType3["Spectate"] = 2] = "Spectate";
      MessageActivityType3[MessageActivityType3["Listen"] = 3] = "Listen";
      MessageActivityType3[MessageActivityType3["JoinRequest"] = 5] = "JoinRequest";
    })(MessageActivityType2 || (exports2.MessageActivityType = MessageActivityType2 = {}));
    var MessageReferenceType2;
    (function(MessageReferenceType3) {
      MessageReferenceType3[MessageReferenceType3["Default"] = 0] = "Default";
      MessageReferenceType3[MessageReferenceType3["Forward"] = 1] = "Forward";
    })(MessageReferenceType2 || (exports2.MessageReferenceType = MessageReferenceType2 = {}));
    var MessageFlags3;
    (function(MessageFlags4) {
      MessageFlags4[MessageFlags4["Crossposted"] = 1] = "Crossposted";
      MessageFlags4[MessageFlags4["IsCrosspost"] = 2] = "IsCrosspost";
      MessageFlags4[MessageFlags4["SuppressEmbeds"] = 4] = "SuppressEmbeds";
      MessageFlags4[MessageFlags4["SourceMessageDeleted"] = 8] = "SourceMessageDeleted";
      MessageFlags4[MessageFlags4["Urgent"] = 16] = "Urgent";
      MessageFlags4[MessageFlags4["HasThread"] = 32] = "HasThread";
      MessageFlags4[MessageFlags4["Ephemeral"] = 64] = "Ephemeral";
      MessageFlags4[MessageFlags4["Loading"] = 128] = "Loading";
      MessageFlags4[MessageFlags4["FailedToMentionSomeRolesInThread"] = 256] = "FailedToMentionSomeRolesInThread";
      MessageFlags4[MessageFlags4["ShouldShowLinkNotDiscordWarning"] = 1024] = "ShouldShowLinkNotDiscordWarning";
      MessageFlags4[MessageFlags4["SuppressNotifications"] = 4096] = "SuppressNotifications";
      MessageFlags4[MessageFlags4["IsVoiceMessage"] = 8192] = "IsVoiceMessage";
      MessageFlags4[MessageFlags4["HasSnapshot"] = 16384] = "HasSnapshot";
      MessageFlags4[MessageFlags4["IsComponentsV2"] = 32768] = "IsComponentsV2";
    })(MessageFlags3 || (exports2.MessageFlags = MessageFlags3 = {}));
    var BaseThemeType2;
    (function(BaseThemeType3) {
      BaseThemeType3[BaseThemeType3["Unset"] = 0] = "Unset";
      BaseThemeType3[BaseThemeType3["Dark"] = 1] = "Dark";
      BaseThemeType3[BaseThemeType3["Light"] = 2] = "Light";
      BaseThemeType3[BaseThemeType3["Darker"] = 3] = "Darker";
      BaseThemeType3[BaseThemeType3["Midnight"] = 4] = "Midnight";
    })(BaseThemeType2 || (exports2.BaseThemeType = BaseThemeType2 = {}));
    var EmbedType2;
    (function(EmbedType3) {
      EmbedType3["Rich"] = "rich";
      EmbedType3["Image"] = "image";
      EmbedType3["Video"] = "video";
      EmbedType3["GIFV"] = "gifv";
      EmbedType3["Article"] = "article";
      EmbedType3["Link"] = "link";
      EmbedType3["AutoModerationMessage"] = "auto_moderation_message";
      EmbedType3["PollResult"] = "poll_result";
    })(EmbedType2 || (exports2.EmbedType = EmbedType2 = {}));
    var EmbedFlags2;
    (function(EmbedFlags3) {
      EmbedFlags3[EmbedFlags3["IsContentInventoryEntry"] = 32] = "IsContentInventoryEntry";
    })(EmbedFlags2 || (exports2.EmbedFlags = EmbedFlags2 = {}));
    var EmbedMediaFlags2;
    (function(EmbedMediaFlags3) {
      EmbedMediaFlags3[EmbedMediaFlags3["IsAnimated"] = 32] = "IsAnimated";
    })(EmbedMediaFlags2 || (exports2.EmbedMediaFlags = EmbedMediaFlags2 = {}));
    var AttachmentFlags2;
    (function(AttachmentFlags3) {
      AttachmentFlags3[AttachmentFlags3["IsClip"] = 1] = "IsClip";
      AttachmentFlags3[AttachmentFlags3["IsThumbnail"] = 2] = "IsThumbnail";
      AttachmentFlags3[AttachmentFlags3["IsRemix"] = 4] = "IsRemix";
      AttachmentFlags3[AttachmentFlags3["IsSpoiler"] = 8] = "IsSpoiler";
      AttachmentFlags3[AttachmentFlags3["IsAnimated"] = 32] = "IsAnimated";
    })(AttachmentFlags2 || (exports2.AttachmentFlags = AttachmentFlags2 = {}));
    var AllowedMentionsTypes2;
    (function(AllowedMentionsTypes3) {
      AllowedMentionsTypes3["Everyone"] = "everyone";
      AllowedMentionsTypes3["Role"] = "roles";
      AllowedMentionsTypes3["User"] = "users";
    })(AllowedMentionsTypes2 || (exports2.AllowedMentionsTypes = AllowedMentionsTypes2 = {}));
    var ComponentType2;
    (function(ComponentType3) {
      ComponentType3[ComponentType3["ActionRow"] = 1] = "ActionRow";
      ComponentType3[ComponentType3["Button"] = 2] = "Button";
      ComponentType3[ComponentType3["StringSelect"] = 3] = "StringSelect";
      ComponentType3[ComponentType3["TextInput"] = 4] = "TextInput";
      ComponentType3[ComponentType3["UserSelect"] = 5] = "UserSelect";
      ComponentType3[ComponentType3["RoleSelect"] = 6] = "RoleSelect";
      ComponentType3[ComponentType3["MentionableSelect"] = 7] = "MentionableSelect";
      ComponentType3[ComponentType3["ChannelSelect"] = 8] = "ChannelSelect";
      ComponentType3[ComponentType3["Section"] = 9] = "Section";
      ComponentType3[ComponentType3["TextDisplay"] = 10] = "TextDisplay";
      ComponentType3[ComponentType3["Thumbnail"] = 11] = "Thumbnail";
      ComponentType3[ComponentType3["MediaGallery"] = 12] = "MediaGallery";
      ComponentType3[ComponentType3["File"] = 13] = "File";
      ComponentType3[ComponentType3["Separator"] = 14] = "Separator";
      ComponentType3[ComponentType3["ContentInventoryEntry"] = 16] = "ContentInventoryEntry";
      ComponentType3[ComponentType3["Container"] = 17] = "Container";
      ComponentType3[ComponentType3["Label"] = 18] = "Label";
      ComponentType3[ComponentType3["FileUpload"] = 19] = "FileUpload";
      ComponentType3[ComponentType3["RadioGroup"] = 21] = "RadioGroup";
      ComponentType3[ComponentType3["CheckboxGroup"] = 22] = "CheckboxGroup";
      ComponentType3[ComponentType3["Checkbox"] = 23] = "Checkbox";
      ComponentType3[ComponentType3["SelectMenu"] = 3] = "SelectMenu";
    })(ComponentType2 || (exports2.ComponentType = ComponentType2 = {}));
    var ButtonStyle2;
    (function(ButtonStyle3) {
      ButtonStyle3[ButtonStyle3["Primary"] = 1] = "Primary";
      ButtonStyle3[ButtonStyle3["Secondary"] = 2] = "Secondary";
      ButtonStyle3[ButtonStyle3["Success"] = 3] = "Success";
      ButtonStyle3[ButtonStyle3["Danger"] = 4] = "Danger";
      ButtonStyle3[ButtonStyle3["Link"] = 5] = "Link";
      ButtonStyle3[ButtonStyle3["Premium"] = 6] = "Premium";
    })(ButtonStyle2 || (exports2.ButtonStyle = ButtonStyle2 = {}));
    var TextInputStyle2;
    (function(TextInputStyle3) {
      TextInputStyle3[TextInputStyle3["Short"] = 1] = "Short";
      TextInputStyle3[TextInputStyle3["Paragraph"] = 2] = "Paragraph";
    })(TextInputStyle2 || (exports2.TextInputStyle = TextInputStyle2 = {}));
    var SelectMenuDefaultValueType2;
    (function(SelectMenuDefaultValueType3) {
      SelectMenuDefaultValueType3["Channel"] = "channel";
      SelectMenuDefaultValueType3["Role"] = "role";
      SelectMenuDefaultValueType3["User"] = "user";
    })(SelectMenuDefaultValueType2 || (exports2.SelectMenuDefaultValueType = SelectMenuDefaultValueType2 = {}));
    var UnfurledMediaItemLoadingState2;
    (function(UnfurledMediaItemLoadingState3) {
      UnfurledMediaItemLoadingState3[UnfurledMediaItemLoadingState3["Unknown"] = 0] = "Unknown";
      UnfurledMediaItemLoadingState3[UnfurledMediaItemLoadingState3["Loading"] = 1] = "Loading";
      UnfurledMediaItemLoadingState3[UnfurledMediaItemLoadingState3["LoadedSuccess"] = 2] = "LoadedSuccess";
      UnfurledMediaItemLoadingState3[UnfurledMediaItemLoadingState3["LoadedNotFound"] = 3] = "LoadedNotFound";
    })(UnfurledMediaItemLoadingState2 || (exports2.UnfurledMediaItemLoadingState = UnfurledMediaItemLoadingState2 = {}));
    var UnfurledMediaItemFlags2;
    (function(UnfurledMediaItemFlags3) {
      UnfurledMediaItemFlags3[UnfurledMediaItemFlags3["IsAnimated"] = 1] = "IsAnimated";
    })(UnfurledMediaItemFlags2 || (exports2.UnfurledMediaItemFlags = UnfurledMediaItemFlags2 = {}));
    var SeparatorSpacingSize2;
    (function(SeparatorSpacingSize3) {
      SeparatorSpacingSize3[SeparatorSpacingSize3["Small"] = 1] = "Small";
      SeparatorSpacingSize3[SeparatorSpacingSize3["Large"] = 2] = "Large";
    })(SeparatorSpacingSize2 || (exports2.SeparatorSpacingSize = SeparatorSpacingSize2 = {}));
    var MessageSearchAuthorType2;
    (function(MessageSearchAuthorType3) {
      MessageSearchAuthorType3["User"] = "user";
      MessageSearchAuthorType3["Bot"] = "bot";
      MessageSearchAuthorType3["Webhook"] = "webhook";
      MessageSearchAuthorType3["NotUser"] = "-user";
      MessageSearchAuthorType3["NotBot"] = "-bot";
      MessageSearchAuthorType3["NotWebhook"] = "-webhook";
    })(MessageSearchAuthorType2 || (exports2.MessageSearchAuthorType = MessageSearchAuthorType2 = {}));
    var MessageSearchHasType2;
    (function(MessageSearchHasType3) {
      MessageSearchHasType3["Image"] = "image";
      MessageSearchHasType3["Sound"] = "sound";
      MessageSearchHasType3["Video"] = "video";
      MessageSearchHasType3["File"] = "file";
      MessageSearchHasType3["Sticker"] = "sticker";
      MessageSearchHasType3["Embed"] = "embed";
      MessageSearchHasType3["Link"] = "link";
      MessageSearchHasType3["Poll"] = "poll";
      MessageSearchHasType3["Snapshot"] = "snapshot";
      MessageSearchHasType3["NotImage"] = "-image";
      MessageSearchHasType3["NotSound"] = "-sound";
      MessageSearchHasType3["NotVideo"] = "-video";
      MessageSearchHasType3["NotFile"] = "-file";
      MessageSearchHasType3["NotSticker"] = "-sticker";
      MessageSearchHasType3["NotEmbed"] = "-embed";
      MessageSearchHasType3["NotLink"] = "-link";
      MessageSearchHasType3["NotPoll"] = "-poll";
      MessageSearchHasType3["NotSnapshot"] = "-snapshot";
    })(MessageSearchHasType2 || (exports2.MessageSearchHasType = MessageSearchHasType2 = {}));
    var MessageSearchEmbedType2;
    (function(MessageSearchEmbedType3) {
      MessageSearchEmbedType3["Image"] = "image";
      MessageSearchEmbedType3["Video"] = "video";
      MessageSearchEmbedType3["Gif"] = "gif";
      MessageSearchEmbedType3["Sound"] = "sound";
      MessageSearchEmbedType3["Article"] = "article";
    })(MessageSearchEmbedType2 || (exports2.MessageSearchEmbedType = MessageSearchEmbedType2 = {}));
    var MessageSearchSortMode2;
    (function(MessageSearchSortMode3) {
      MessageSearchSortMode3["Timestamp"] = "timestamp";
      MessageSearchSortMode3["Relevance"] = "relevance";
    })(MessageSearchSortMode2 || (exports2.MessageSearchSortMode = MessageSearchSortMode2 = {}));
  }
});

// node_modules/discord-api-types/payloads/v10/monetization.js
var require_monetization = __commonJS({
  "node_modules/discord-api-types/payloads/v10/monetization.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SubscriptionStatus = exports2.SKUType = exports2.SKUFlags = exports2.EntitlementType = void 0;
    var EntitlementType2;
    (function(EntitlementType3) {
      EntitlementType3[EntitlementType3["Purchase"] = 1] = "Purchase";
      EntitlementType3[EntitlementType3["PremiumSubscription"] = 2] = "PremiumSubscription";
      EntitlementType3[EntitlementType3["DeveloperGift"] = 3] = "DeveloperGift";
      EntitlementType3[EntitlementType3["TestModePurchase"] = 4] = "TestModePurchase";
      EntitlementType3[EntitlementType3["FreePurchase"] = 5] = "FreePurchase";
      EntitlementType3[EntitlementType3["UserGift"] = 6] = "UserGift";
      EntitlementType3[EntitlementType3["PremiumPurchase"] = 7] = "PremiumPurchase";
      EntitlementType3[EntitlementType3["ApplicationSubscription"] = 8] = "ApplicationSubscription";
    })(EntitlementType2 || (exports2.EntitlementType = EntitlementType2 = {}));
    var SKUFlags2;
    (function(SKUFlags3) {
      SKUFlags3[SKUFlags3["Available"] = 4] = "Available";
      SKUFlags3[SKUFlags3["GuildSubscription"] = 128] = "GuildSubscription";
      SKUFlags3[SKUFlags3["UserSubscription"] = 256] = "UserSubscription";
    })(SKUFlags2 || (exports2.SKUFlags = SKUFlags2 = {}));
    var SKUType2;
    (function(SKUType3) {
      SKUType3[SKUType3["Durable"] = 2] = "Durable";
      SKUType3[SKUType3["Consumable"] = 3] = "Consumable";
      SKUType3[SKUType3["Subscription"] = 5] = "Subscription";
      SKUType3[SKUType3["SubscriptionGroup"] = 6] = "SubscriptionGroup";
    })(SKUType2 || (exports2.SKUType = SKUType2 = {}));
    var SubscriptionStatus2;
    (function(SubscriptionStatus3) {
      SubscriptionStatus3[SubscriptionStatus3["Active"] = 0] = "Active";
      SubscriptionStatus3[SubscriptionStatus3["Inactive"] = 1] = "Inactive";
      SubscriptionStatus3[SubscriptionStatus3["Ending"] = 2] = "Ending";
    })(SubscriptionStatus2 || (exports2.SubscriptionStatus = SubscriptionStatus2 = {}));
  }
});

// node_modules/discord-api-types/payloads/v10/oauth2.js
var require_oauth2 = __commonJS({
  "node_modules/discord-api-types/payloads/v10/oauth2.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.OAuth2Scopes = void 0;
    var OAuth2Scopes2;
    (function(OAuth2Scopes3) {
      OAuth2Scopes3["Bot"] = "bot";
      OAuth2Scopes3["Connections"] = "connections";
      OAuth2Scopes3["DMChannelsRead"] = "dm_channels.read";
      OAuth2Scopes3["Email"] = "email";
      OAuth2Scopes3["Identify"] = "identify";
      OAuth2Scopes3["IdentifyPremium"] = "identify.premium";
      OAuth2Scopes3["Guilds"] = "guilds";
      OAuth2Scopes3["GuildsJoin"] = "guilds.join";
      OAuth2Scopes3["GuildsMembersRead"] = "guilds.members.read";
      OAuth2Scopes3["GroupDMJoins"] = "gdm.join";
      OAuth2Scopes3["MessagesRead"] = "messages.read";
      OAuth2Scopes3["RoleConnectionsWrite"] = "role_connections.write";
      OAuth2Scopes3["RPC"] = "rpc";
      OAuth2Scopes3["RPCActivitiesWrite"] = "rpc.activities.write";
      OAuth2Scopes3["RPCVoiceRead"] = "rpc.voice.read";
      OAuth2Scopes3["RPCVoiceWrite"] = "rpc.voice.write";
      OAuth2Scopes3["RPCNotificationsRead"] = "rpc.notifications.read";
      OAuth2Scopes3["WebhookIncoming"] = "webhook.incoming";
      OAuth2Scopes3["Voice"] = "voice";
      OAuth2Scopes3["ApplicationsBuildsUpload"] = "applications.builds.upload";
      OAuth2Scopes3["ApplicationsBuildsRead"] = "applications.builds.read";
      OAuth2Scopes3["ApplicationsStoreUpdate"] = "applications.store.update";
      OAuth2Scopes3["ApplicationsEntitlements"] = "applications.entitlements";
      OAuth2Scopes3["RelationshipsRead"] = "relationships.read";
      OAuth2Scopes3["ActivitiesRead"] = "activities.read";
      OAuth2Scopes3["ActivitiesWrite"] = "activities.write";
      OAuth2Scopes3["ApplicationsCommands"] = "applications.commands";
      OAuth2Scopes3["ApplicationsCommandsUpdate"] = "applications.commands.update";
      OAuth2Scopes3["ApplicationCommandsPermissionsUpdate"] = "applications.commands.permissions.update";
    })(OAuth2Scopes2 || (exports2.OAuth2Scopes = OAuth2Scopes2 = {}));
  }
});

// node_modules/discord-api-types/payloads/v10/permissions.js
var require_permissions2 = __commonJS({
  "node_modules/discord-api-types/payloads/v10/permissions.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.RoleFlags = void 0;
    var RoleFlags2;
    (function(RoleFlags3) {
      RoleFlags3[RoleFlags3["InPrompt"] = 1] = "InPrompt";
    })(RoleFlags2 || (exports2.RoleFlags = RoleFlags2 = {}));
  }
});

// node_modules/discord-api-types/payloads/v10/poll.js
var require_poll = __commonJS({
  "node_modules/discord-api-types/payloads/v10/poll.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.PollLayoutType = void 0;
    var PollLayoutType2;
    (function(PollLayoutType3) {
      PollLayoutType3[PollLayoutType3["Default"] = 1] = "Default";
    })(PollLayoutType2 || (exports2.PollLayoutType = PollLayoutType2 = {}));
  }
});

// node_modules/discord-api-types/payloads/v10/stageInstance.js
var require_stageInstance = __commonJS({
  "node_modules/discord-api-types/payloads/v10/stageInstance.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.StageInstancePrivacyLevel = void 0;
    var StageInstancePrivacyLevel2;
    (function(StageInstancePrivacyLevel3) {
      StageInstancePrivacyLevel3[StageInstancePrivacyLevel3["Public"] = 1] = "Public";
      StageInstancePrivacyLevel3[StageInstancePrivacyLevel3["GuildOnly"] = 2] = "GuildOnly";
    })(StageInstancePrivacyLevel2 || (exports2.StageInstancePrivacyLevel = StageInstancePrivacyLevel2 = {}));
  }
});

// node_modules/discord-api-types/payloads/v10/sticker.js
var require_sticker = __commonJS({
  "node_modules/discord-api-types/payloads/v10/sticker.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.StickerFormatType = exports2.StickerType = void 0;
    var StickerType2;
    (function(StickerType3) {
      StickerType3[StickerType3["Standard"] = 1] = "Standard";
      StickerType3[StickerType3["Guild"] = 2] = "Guild";
    })(StickerType2 || (exports2.StickerType = StickerType2 = {}));
    var StickerFormatType2;
    (function(StickerFormatType3) {
      StickerFormatType3[StickerFormatType3["PNG"] = 1] = "PNG";
      StickerFormatType3[StickerFormatType3["APNG"] = 2] = "APNG";
      StickerFormatType3[StickerFormatType3["Lottie"] = 3] = "Lottie";
      StickerFormatType3[StickerFormatType3["GIF"] = 4] = "GIF";
    })(StickerFormatType2 || (exports2.StickerFormatType = StickerFormatType2 = {}));
  }
});

// node_modules/discord-api-types/payloads/v10/teams.js
var require_teams = __commonJS({
  "node_modules/discord-api-types/payloads/v10/teams.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.TeamMemberRole = exports2.TeamMemberMembershipState = void 0;
    var TeamMemberMembershipState2;
    (function(TeamMemberMembershipState3) {
      TeamMemberMembershipState3[TeamMemberMembershipState3["Invited"] = 1] = "Invited";
      TeamMemberMembershipState3[TeamMemberMembershipState3["Accepted"] = 2] = "Accepted";
    })(TeamMemberMembershipState2 || (exports2.TeamMemberMembershipState = TeamMemberMembershipState2 = {}));
    var TeamMemberRole2;
    (function(TeamMemberRole3) {
      TeamMemberRole3["Admin"] = "admin";
      TeamMemberRole3["Developer"] = "developer";
      TeamMemberRole3["ReadOnly"] = "read_only";
    })(TeamMemberRole2 || (exports2.TeamMemberRole = TeamMemberRole2 = {}));
  }
});

// node_modules/discord-api-types/payloads/v10/user.js
var require_user = __commonJS({
  "node_modules/discord-api-types/payloads/v10/user.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.NameplatePalette = exports2.ConnectionVisibility = exports2.ConnectionService = exports2.UserPremiumType = exports2.UserFlags = void 0;
    var UserFlags2;
    (function(UserFlags3) {
      UserFlags3[UserFlags3["Staff"] = 1] = "Staff";
      UserFlags3[UserFlags3["Partner"] = 2] = "Partner";
      UserFlags3[UserFlags3["Hypesquad"] = 4] = "Hypesquad";
      UserFlags3[UserFlags3["BugHunterLevel1"] = 8] = "BugHunterLevel1";
      UserFlags3[UserFlags3["MFASMS"] = 16] = "MFASMS";
      UserFlags3[UserFlags3["PremiumPromoDismissed"] = 32] = "PremiumPromoDismissed";
      UserFlags3[UserFlags3["HypeSquadOnlineHouse1"] = 64] = "HypeSquadOnlineHouse1";
      UserFlags3[UserFlags3["HypeSquadOnlineHouse2"] = 128] = "HypeSquadOnlineHouse2";
      UserFlags3[UserFlags3["HypeSquadOnlineHouse3"] = 256] = "HypeSquadOnlineHouse3";
      UserFlags3[UserFlags3["PremiumEarlySupporter"] = 512] = "PremiumEarlySupporter";
      UserFlags3[UserFlags3["TeamPseudoUser"] = 1024] = "TeamPseudoUser";
      UserFlags3[UserFlags3["HasUnreadUrgentMessages"] = 8192] = "HasUnreadUrgentMessages";
      UserFlags3[UserFlags3["BugHunterLevel2"] = 16384] = "BugHunterLevel2";
      UserFlags3[UserFlags3["VerifiedBot"] = 65536] = "VerifiedBot";
      UserFlags3[UserFlags3["VerifiedDeveloper"] = 131072] = "VerifiedDeveloper";
      UserFlags3[UserFlags3["CertifiedModerator"] = 262144] = "CertifiedModerator";
      UserFlags3[UserFlags3["BotHTTPInteractions"] = 524288] = "BotHTTPInteractions";
      UserFlags3[UserFlags3["Spammer"] = 1048576] = "Spammer";
      UserFlags3[UserFlags3["DisablePremium"] = 2097152] = "DisablePremium";
      UserFlags3[UserFlags3["ActiveDeveloper"] = 4194304] = "ActiveDeveloper";
      UserFlags3[UserFlags3["Quarantined"] = 17592186044416] = "Quarantined";
      UserFlags3[UserFlags3["Collaborator"] = 1125899906842624] = "Collaborator";
      UserFlags3[UserFlags3["RestrictedCollaborator"] = 2251799813685248] = "RestrictedCollaborator";
    })(UserFlags2 || (exports2.UserFlags = UserFlags2 = {}));
    var UserPremiumType2;
    (function(UserPremiumType3) {
      UserPremiumType3[UserPremiumType3["None"] = 0] = "None";
      UserPremiumType3[UserPremiumType3["NitroClassic"] = 1] = "NitroClassic";
      UserPremiumType3[UserPremiumType3["Nitro"] = 2] = "Nitro";
      UserPremiumType3[UserPremiumType3["NitroBasic"] = 3] = "NitroBasic";
    })(UserPremiumType2 || (exports2.UserPremiumType = UserPremiumType2 = {}));
    var ConnectionService2;
    (function(ConnectionService3) {
      ConnectionService3["AmazonMusic"] = "amazon-music";
      ConnectionService3["BattleNet"] = "battlenet";
      ConnectionService3["Bluesky"] = "bluesky";
      ConnectionService3["BungieNet"] = "bungie";
      ConnectionService3["Crunchyroll"] = "crunchyroll";
      ConnectionService3["Domain"] = "domain";
      ConnectionService3["eBay"] = "ebay";
      ConnectionService3["EpicGames"] = "epicgames";
      ConnectionService3["Facebook"] = "facebook";
      ConnectionService3["GitHub"] = "github";
      ConnectionService3["Instagram"] = "instagram";
      ConnectionService3["LeagueOfLegends"] = "leagueoflegends";
      ConnectionService3["Mastodon"] = "mastodon";
      ConnectionService3["PayPal"] = "paypal";
      ConnectionService3["PlayStationNetwork"] = "playstation";
      ConnectionService3["Reddit"] = "reddit";
      ConnectionService3["RiotGames"] = "riotgames";
      ConnectionService3["Roblox"] = "roblox";
      ConnectionService3["Spotify"] = "spotify";
      ConnectionService3["Skype"] = "skype";
      ConnectionService3["Steam"] = "steam";
      ConnectionService3["TikTok"] = "tiktok";
      ConnectionService3["Twitch"] = "twitch";
      ConnectionService3["X"] = "twitter";
      ConnectionService3["Twitter"] = "twitter";
      ConnectionService3["Xbox"] = "xbox";
      ConnectionService3["YouTube"] = "youtube";
    })(ConnectionService2 || (exports2.ConnectionService = ConnectionService2 = {}));
    var ConnectionVisibility2;
    (function(ConnectionVisibility3) {
      ConnectionVisibility3[ConnectionVisibility3["None"] = 0] = "None";
      ConnectionVisibility3[ConnectionVisibility3["Everyone"] = 1] = "Everyone";
    })(ConnectionVisibility2 || (exports2.ConnectionVisibility = ConnectionVisibility2 = {}));
    var NameplatePalette2;
    (function(NameplatePalette3) {
      NameplatePalette3["Berry"] = "berry";
      NameplatePalette3["BubbleGum"] = "bubble_gum";
      NameplatePalette3["Clover"] = "clover";
      NameplatePalette3["Cobalt"] = "cobalt";
      NameplatePalette3["Crimson"] = "crimson";
      NameplatePalette3["Forest"] = "forest";
      NameplatePalette3["Lemon"] = "lemon";
      NameplatePalette3["Sky"] = "sky";
      NameplatePalette3["Teal"] = "teal";
      NameplatePalette3["Violet"] = "violet";
      NameplatePalette3["White"] = "white";
    })(NameplatePalette2 || (exports2.NameplatePalette = NameplatePalette2 = {}));
  }
});

// node_modules/discord-api-types/payloads/v10/webhook.js
var require_webhook = __commonJS({
  "node_modules/discord-api-types/payloads/v10/webhook.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.WebhookType = exports2.ApplicationWebhookEventType = exports2.ApplicationWebhookType = void 0;
    var ApplicationWebhookType2;
    (function(ApplicationWebhookType3) {
      ApplicationWebhookType3[ApplicationWebhookType3["Ping"] = 0] = "Ping";
      ApplicationWebhookType3[ApplicationWebhookType3["Event"] = 1] = "Event";
    })(ApplicationWebhookType2 || (exports2.ApplicationWebhookType = ApplicationWebhookType2 = {}));
    var ApplicationWebhookEventType2;
    (function(ApplicationWebhookEventType3) {
      ApplicationWebhookEventType3["ApplicationAuthorized"] = "APPLICATION_AUTHORIZED";
      ApplicationWebhookEventType3["ApplicationDeauthorized"] = "APPLICATION_DEAUTHORIZED";
      ApplicationWebhookEventType3["EntitlementCreate"] = "ENTITLEMENT_CREATE";
      ApplicationWebhookEventType3["EntitlementUpdate"] = "ENTITLEMENT_UPDATE";
      ApplicationWebhookEventType3["EntitlementDelete"] = "ENTITLEMENT_DELETE";
      ApplicationWebhookEventType3["QuestUserEnrollment"] = "QUEST_USER_ENROLLMENT";
    })(ApplicationWebhookEventType2 || (exports2.ApplicationWebhookEventType = ApplicationWebhookEventType2 = {}));
    var WebhookType2;
    (function(WebhookType3) {
      WebhookType3[WebhookType3["Incoming"] = 1] = "Incoming";
      WebhookType3[WebhookType3["ChannelFollower"] = 2] = "ChannelFollower";
      WebhookType3[WebhookType3["Application"] = 3] = "Application";
    })(WebhookType2 || (exports2.WebhookType = WebhookType2 = {}));
  }
});

// node_modules/discord-api-types/payloads/v10/index.js
var require_v102 = __commonJS({
  "node_modules/discord-api-types/payloads/v10/index.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p)) __createBinding(exports3, m, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    __exportStar(require_common(), exports2);
    __exportStar(require_application(), exports2);
    __exportStar(require_auditLog(), exports2);
    __exportStar(require_autoModeration(), exports2);
    __exportStar(require_channel(), exports2);
    __exportStar(require_gateway(), exports2);
    __exportStar(require_guild(), exports2);
    __exportStar(require_guildScheduledEvent(), exports2);
    __exportStar(require_interactions(), exports2);
    __exportStar(require_invite(), exports2);
    __exportStar(require_message(), exports2);
    __exportStar(require_monetization(), exports2);
    __exportStar(require_oauth2(), exports2);
    __exportStar(require_permissions2(), exports2);
    __exportStar(require_poll(), exports2);
    __exportStar(require_stageInstance(), exports2);
    __exportStar(require_sticker(), exports2);
    __exportStar(require_teams(), exports2);
    __exportStar(require_user(), exports2);
    __exportStar(require_webhook(), exports2);
  }
});

// node_modules/discord-api-types/utils/internals.js
var require_internals = __commonJS({
  "node_modules/discord-api-types/utils/internals.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.urlSafeCharacters = void 0;
    var pattern = /^[\d%A-Za-z-_]+$/g;
    exports2.urlSafeCharacters = {
      test(input) {
        const result = pattern.test(input);
        pattern.lastIndex = 0;
        return result;
      }
    };
  }
});

// node_modules/discord-api-types/rest/common.js
var require_common2 = __commonJS({
  "node_modules/discord-api-types/rest/common.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Locale = exports2.CannotSendMessagesToThisUserErrorCodes = exports2.RESTJSONErrorCodes = void 0;
    var RESTJSONErrorCodes2;
    (function(RESTJSONErrorCodes3) {
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["GeneralError"] = 0] = "GeneralError";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["UnknownAccount"] = 10001] = "UnknownAccount";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["UnknownApplication"] = 10002] = "UnknownApplication";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["UnknownChannel"] = 10003] = "UnknownChannel";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["UnknownGuild"] = 10004] = "UnknownGuild";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["UnknownIntegration"] = 10005] = "UnknownIntegration";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["UnknownInvite"] = 10006] = "UnknownInvite";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["UnknownMember"] = 10007] = "UnknownMember";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["UnknownMessage"] = 10008] = "UnknownMessage";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["UnknownPermissionOverwrite"] = 10009] = "UnknownPermissionOverwrite";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["UnknownProvider"] = 10010] = "UnknownProvider";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["UnknownRole"] = 10011] = "UnknownRole";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["UnknownToken"] = 10012] = "UnknownToken";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["UnknownUser"] = 10013] = "UnknownUser";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["UnknownEmoji"] = 10014] = "UnknownEmoji";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["UnknownWebhook"] = 10015] = "UnknownWebhook";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["UnknownWebhookService"] = 10016] = "UnknownWebhookService";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["UnknownSession"] = 10020] = "UnknownSession";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["UnknownAsset"] = 10021] = "UnknownAsset";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["UnknownBan"] = 10026] = "UnknownBan";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["UnknownSKU"] = 10027] = "UnknownSKU";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["UnknownStoreListing"] = 10028] = "UnknownStoreListing";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["UnknownEntitlement"] = 10029] = "UnknownEntitlement";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["UnknownBuild"] = 10030] = "UnknownBuild";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["UnknownLobby"] = 10031] = "UnknownLobby";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["UnknownBranch"] = 10032] = "UnknownBranch";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["UnknownStoreDirectoryLayout"] = 10033] = "UnknownStoreDirectoryLayout";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["UnknownRedistributable"] = 10036] = "UnknownRedistributable";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["UnknownGiftCode"] = 10038] = "UnknownGiftCode";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["UnknownStream"] = 10049] = "UnknownStream";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["UnknownPremiumServerSubscribeCooldown"] = 10050] = "UnknownPremiumServerSubscribeCooldown";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["UnknownGuildTemplate"] = 10057] = "UnknownGuildTemplate";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["UnknownDiscoverableServerCategory"] = 10059] = "UnknownDiscoverableServerCategory";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["UnknownSticker"] = 10060] = "UnknownSticker";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["UnknownStickerPack"] = 10061] = "UnknownStickerPack";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["UnknownInteraction"] = 10062] = "UnknownInteraction";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["UnknownApplicationCommand"] = 10063] = "UnknownApplicationCommand";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["UnknownVoiceState"] = 10065] = "UnknownVoiceState";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["UnknownApplicationCommandPermissions"] = 10066] = "UnknownApplicationCommandPermissions";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["UnknownStageInstance"] = 10067] = "UnknownStageInstance";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["UnknownGuildMemberVerificationForm"] = 10068] = "UnknownGuildMemberVerificationForm";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["UnknownGuildWelcomeScreen"] = 10069] = "UnknownGuildWelcomeScreen";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["UnknownGuildScheduledEvent"] = 10070] = "UnknownGuildScheduledEvent";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["UnknownGuildScheduledEventUser"] = 10071] = "UnknownGuildScheduledEventUser";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["UnknownTag"] = 10087] = "UnknownTag";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["UnknownSound"] = 10097] = "UnknownSound";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["UnknownInviteTargetUsersJob"] = 10124] = "UnknownInviteTargetUsersJob";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["UnknownInviteTargetUsers"] = 10129] = "UnknownInviteTargetUsers";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["BotsCannotUseThisEndpoint"] = 20001] = "BotsCannotUseThisEndpoint";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["OnlyBotsCanUseThisEndpoint"] = 20002] = "OnlyBotsCanUseThisEndpoint";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["ExplicitContentCannotBeSentToTheDesiredRecipient"] = 20009] = "ExplicitContentCannotBeSentToTheDesiredRecipient";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["NotAuthorizedToPerformThisActionOnThisApplication"] = 20012] = "NotAuthorizedToPerformThisActionOnThisApplication";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["ThisActionRequiresAPremiumSubscription"] = 20015] = "ThisActionRequiresAPremiumSubscription";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["ActionCannotBePerformedDueToSlowmodeRateLimit"] = 20016] = "ActionCannotBePerformedDueToSlowmodeRateLimit";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["TheMazeIsntMeantForYou"] = 20017] = "TheMazeIsntMeantForYou";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["OnlyTheOwnerOfThisAccountCanPerformThisAction"] = 20018] = "OnlyTheOwnerOfThisAccountCanPerformThisAction";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["AnnouncementEditLimitExceeded"] = 20022] = "AnnouncementEditLimitExceeded";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["UnderMinimumAge"] = 20024] = "UnderMinimumAge";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["ChannelWriteRateLimit"] = 20028] = "ChannelWriteRateLimit";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["ChannelSendRateLimit"] = 20028] = "ChannelSendRateLimit";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["ServerWriteRateLimit"] = 20029] = "ServerWriteRateLimit";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["ServerSendRateLimit"] = 20029] = "ServerSendRateLimit";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["StageTopicServerNameServerDescriptionOrChannelNamesContainDisallowedWords"] = 20031] = "StageTopicServerNameServerDescriptionOrChannelNamesContainDisallowedWords";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["GuildPremiumSubscriptionLevelTooLow"] = 20035] = "GuildPremiumSubscriptionLevelTooLow";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["MaximumNumberOfGuildsReached"] = 30001] = "MaximumNumberOfGuildsReached";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["MaximumNumberOfFriendsReached"] = 30002] = "MaximumNumberOfFriendsReached";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["MaximumNumberOfPinsReachedForTheChannel"] = 30003] = "MaximumNumberOfPinsReachedForTheChannel";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["MaximumNumberOfRecipientsReached"] = 30004] = "MaximumNumberOfRecipientsReached";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["MaximumNumberOfGuildRolesReached"] = 30005] = "MaximumNumberOfGuildRolesReached";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["MaximumNumberOfWebhooksReached"] = 30007] = "MaximumNumberOfWebhooksReached";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["MaximumNumberOfEmojisReached"] = 30008] = "MaximumNumberOfEmojisReached";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["MaximumNumberOfReactionsReached"] = 30010] = "MaximumNumberOfReactionsReached";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["MaximumNumberOfGroupDMsReached"] = 30011] = "MaximumNumberOfGroupDMsReached";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["MaximumNumberOfGuildChannelsReached"] = 30013] = "MaximumNumberOfGuildChannelsReached";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["MaximumNumberOfAttachmentsInAMessageReached"] = 30015] = "MaximumNumberOfAttachmentsInAMessageReached";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["MaximumNumberOfInvitesReached"] = 30016] = "MaximumNumberOfInvitesReached";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["MaximumNumberOfAnimatedEmojisReached"] = 30018] = "MaximumNumberOfAnimatedEmojisReached";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["MaximumNumberOfServerMembersReached"] = 30019] = "MaximumNumberOfServerMembersReached";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["MaximumNumberOfServerCategoriesReached"] = 30030] = "MaximumNumberOfServerCategoriesReached";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["GuildAlreadyHasTemplate"] = 30031] = "GuildAlreadyHasTemplate";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["MaximumNumberOfApplicationCommandsReached"] = 30032] = "MaximumNumberOfApplicationCommandsReached";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["MaximumThreadParticipantsReached"] = 30033] = "MaximumThreadParticipantsReached";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["MaximumDailyApplicationCommandCreatesReached"] = 30034] = "MaximumDailyApplicationCommandCreatesReached";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["MaximumNumberOfNonGuildMemberBansHasBeenExceeded"] = 30035] = "MaximumNumberOfNonGuildMemberBansHasBeenExceeded";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["MaximumNumberOfBanFetchesHasBeenReached"] = 30037] = "MaximumNumberOfBanFetchesHasBeenReached";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["MaximumNumberOfUncompletedGuildScheduledEventsReached"] = 30038] = "MaximumNumberOfUncompletedGuildScheduledEventsReached";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["MaximumNumberOfStickersReached"] = 30039] = "MaximumNumberOfStickersReached";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["MaximumNumberOfPruneRequestsHasBeenReached"] = 30040] = "MaximumNumberOfPruneRequestsHasBeenReached";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["MaximumNumberOfGuildWidgetSettingsUpdatesHasBeenReached"] = 30042] = "MaximumNumberOfGuildWidgetSettingsUpdatesHasBeenReached";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["MaximumNumberOfSoundboardSoundsReached"] = 30045] = "MaximumNumberOfSoundboardSoundsReached";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["MaximumNumberOfEditsToMessagesOlderThanOneHourReached"] = 30046] = "MaximumNumberOfEditsToMessagesOlderThanOneHourReached";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["MaximumNumberOfPinnedThreadsInForumHasBeenReached"] = 30047] = "MaximumNumberOfPinnedThreadsInForumHasBeenReached";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["MaximumNumberOfTagsInForumHasBeenReached"] = 30048] = "MaximumNumberOfTagsInForumHasBeenReached";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["BitrateIsTooHighForChannelOfThisType"] = 30052] = "BitrateIsTooHighForChannelOfThisType";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["MaximumNumberOfPremiumEmojisReached"] = 30056] = "MaximumNumberOfPremiumEmojisReached";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["MaximumNumberOfWebhooksPerGuildReached"] = 30058] = "MaximumNumberOfWebhooksPerGuildReached";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["MaximumNumberOfChannelPermissionOverwritesReached"] = 30060] = "MaximumNumberOfChannelPermissionOverwritesReached";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["TheChannelsForThisGuildAreTooLarge"] = 30061] = "TheChannelsForThisGuildAreTooLarge";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["Unauthorized"] = 40001] = "Unauthorized";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["VerifyYourAccount"] = 40002] = "VerifyYourAccount";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["OpeningDirectMessagesTooFast"] = 40003] = "OpeningDirectMessagesTooFast";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["SendMessagesHasBeenTemporarilyDisabled"] = 40004] = "SendMessagesHasBeenTemporarilyDisabled";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["RequestEntityTooLarge"] = 40005] = "RequestEntityTooLarge";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["FeatureTemporarilyDisabledServerSide"] = 40006] = "FeatureTemporarilyDisabledServerSide";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["UserBannedFromThisGuild"] = 40007] = "UserBannedFromThisGuild";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["OnlyOneChannelCanHaveAParentIdModifiedAtATime"] = 40009] = "OnlyOneChannelCanHaveAParentIdModifiedAtATime";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["ConnectionHasBeenRevoked"] = 40012] = "ConnectionHasBeenRevoked";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["OnlyConsumableSKUsCanBeConsumed"] = 40018] = "OnlyConsumableSKUsCanBeConsumed";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["YouCanOnlyDeleteSandboxEntitlements"] = 40019] = "YouCanOnlyDeleteSandboxEntitlements";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["TargetUserIsNotConnectedToVoice"] = 40032] = "TargetUserIsNotConnectedToVoice";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["ThisMessageWasAlreadyCrossposted"] = 40033] = "ThisMessageWasAlreadyCrossposted";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["ApplicationCommandWithThatNameAlreadyExists"] = 40041] = "ApplicationCommandWithThatNameAlreadyExists";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["ApplicationInteractionFailedToSend"] = 40043] = "ApplicationInteractionFailedToSend";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["CannotSendAMessageInAForumChannel"] = 40058] = "CannotSendAMessageInAForumChannel";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["InteractionHasAlreadyBeenAcknowledged"] = 40060] = "InteractionHasAlreadyBeenAcknowledged";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["TagNamesMustBeUnique"] = 40061] = "TagNamesMustBeUnique";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["ServiceResourceIsBeingRateLimited"] = 40062] = "ServiceResourceIsBeingRateLimited";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["ThereAreNoTagsAvailableThatCanBeSetByNonModerators"] = 40066] = "ThereAreNoTagsAvailableThatCanBeSetByNonModerators";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["TagRequiredToCreateAForumPostInThisChannel"] = 40067] = "TagRequiredToCreateAForumPostInThisChannel";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["AnEntitlementHasAlreadyBeenGrantedForThisResource"] = 40074] = "AnEntitlementHasAlreadyBeenGrantedForThisResource";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["ThisInteractionHasHitTheMaximumNumberOfFollowUpMessages"] = 40094] = "ThisInteractionHasHitTheMaximumNumberOfFollowUpMessages";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["CloudflareIsBlockingYourRequest"] = 40333] = "CloudflareIsBlockingYourRequest";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["MissingAccess"] = 50001] = "MissingAccess";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["InvalidAccountType"] = 50002] = "InvalidAccountType";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["CannotExecuteActionOnDMChannel"] = 50003] = "CannotExecuteActionOnDMChannel";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["GuildWidgetDisabled"] = 50004] = "GuildWidgetDisabled";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["CannotEditMessageAuthoredByAnotherUser"] = 50005] = "CannotEditMessageAuthoredByAnotherUser";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["CannotSendAnEmptyMessage"] = 50006] = "CannotSendAnEmptyMessage";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["CannotSendMessagesToThisUser"] = 50007] = "CannotSendMessagesToThisUser";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["CannotSendMessagesInNonTextChannel"] = 50008] = "CannotSendMessagesInNonTextChannel";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["ChannelVerificationLevelTooHighForYouToGainAccess"] = 50009] = "ChannelVerificationLevelTooHighForYouToGainAccess";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["OAuth2ApplicationDoesNotHaveBot"] = 50010] = "OAuth2ApplicationDoesNotHaveBot";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["OAuth2ApplicationLimitReached"] = 50011] = "OAuth2ApplicationLimitReached";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["InvalidOAuth2State"] = 50012] = "InvalidOAuth2State";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["MissingPermissions"] = 50013] = "MissingPermissions";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["InvalidToken"] = 50014] = "InvalidToken";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["NoteWasTooLong"] = 50015] = "NoteWasTooLong";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["ProvidedTooFewOrTooManyMessagesToDelete"] = 50016] = "ProvidedTooFewOrTooManyMessagesToDelete";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["InvalidMFALevel"] = 50017] = "InvalidMFALevel";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["MessageCanOnlyBePinnedInTheChannelItWasSentIn"] = 50019] = "MessageCanOnlyBePinnedInTheChannelItWasSentIn";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["InviteCodeInvalidOrTaken"] = 50020] = "InviteCodeInvalidOrTaken";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["CannotExecuteActionOnSystemMessage"] = 50021] = "CannotExecuteActionOnSystemMessage";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["CannotExecuteActionOnThisChannelType"] = 50024] = "CannotExecuteActionOnThisChannelType";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["InvalidOAuth2AccessToken"] = 50025] = "InvalidOAuth2AccessToken";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["MissingRequiredOAuth2Scope"] = 50026] = "MissingRequiredOAuth2Scope";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["InvalidWebhookToken"] = 50027] = "InvalidWebhookToken";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["InvalidRole"] = 50028] = "InvalidRole";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["InvalidRecipients"] = 50033] = "InvalidRecipients";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["OneOfTheMessagesProvidedWasTooOldForBulkDelete"] = 50034] = "OneOfTheMessagesProvidedWasTooOldForBulkDelete";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["InvalidFormBodyOrContentType"] = 50035] = "InvalidFormBodyOrContentType";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["InviteAcceptedToGuildWithoutTheBotBeingIn"] = 50036] = "InviteAcceptedToGuildWithoutTheBotBeingIn";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["InvalidActivityAction"] = 50039] = "InvalidActivityAction";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["InvalidAPIVersion"] = 50041] = "InvalidAPIVersion";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["FileUploadedExceedsMaximumSize"] = 50045] = "FileUploadedExceedsMaximumSize";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["InvalidFileUploaded"] = 50046] = "InvalidFileUploaded";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["CannotSelfRedeemThisGift"] = 50054] = "CannotSelfRedeemThisGift";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["InvalidGuild"] = 50055] = "InvalidGuild";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["InvalidSKU"] = 50057] = "InvalidSKU";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["InvalidRequestOrigin"] = 50067] = "InvalidRequestOrigin";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["InvalidMessageType"] = 50068] = "InvalidMessageType";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["PaymentSourceRequiredToRedeemGift"] = 50070] = "PaymentSourceRequiredToRedeemGift";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["CannotModifyASystemWebhook"] = 50073] = "CannotModifyASystemWebhook";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["CannotDeleteChannelRequiredForCommunityGuilds"] = 50074] = "CannotDeleteChannelRequiredForCommunityGuilds";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["CannotEditStickersWithinMessage"] = 50080] = "CannotEditStickersWithinMessage";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["InvalidStickerSent"] = 50081] = "InvalidStickerSent";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["InvalidActionOnArchivedThread"] = 50083] = "InvalidActionOnArchivedThread";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["InvalidThreadNotificationSettings"] = 50084] = "InvalidThreadNotificationSettings";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["ParameterEarlierThanCreation"] = 50085] = "ParameterEarlierThanCreation";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["CommunityServerChannelsMustBeTextChannels"] = 50086] = "CommunityServerChannelsMustBeTextChannels";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["TheEntityTypeOfTheEventIsDifferentFromTheEntityYouAreTryingToStartTheEventFor"] = 50091] = "TheEntityTypeOfTheEventIsDifferentFromTheEntityYouAreTryingToStartTheEventFor";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["ServerNotAvailableInYourLocation"] = 50095] = "ServerNotAvailableInYourLocation";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["ServerNeedsMonetizationEnabledToPerformThisAction"] = 50097] = "ServerNeedsMonetizationEnabledToPerformThisAction";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["ServerNeedsMoreBoostsToPerformThisAction"] = 50101] = "ServerNeedsMoreBoostsToPerformThisAction";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["RequestBodyContainsInvalidJSON"] = 50109] = "RequestBodyContainsInvalidJSON";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["ProvidedFileIsInvalid"] = 50110] = "ProvidedFileIsInvalid";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["ProvidedFileTypeIsInvalid"] = 50123] = "ProvidedFileTypeIsInvalid";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["ProvidedFileDurationExceedsMaximumLength"] = 50124] = "ProvidedFileDurationExceedsMaximumLength";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["OwnerCannotBePendingMember"] = 50131] = "OwnerCannotBePendingMember";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["OwnershipCannotBeMovedToABotUser"] = 50132] = "OwnershipCannotBeMovedToABotUser";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["FailedToResizeAssetBelowTheMaximumSize"] = 50138] = "FailedToResizeAssetBelowTheMaximumSize";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["FailedToResizeAssetBelowTheMinimumSize"] = 50138] = "FailedToResizeAssetBelowTheMinimumSize";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["CannotMixSubscriptionAndNonSubscriptionRolesForAnEmoji"] = 50144] = "CannotMixSubscriptionAndNonSubscriptionRolesForAnEmoji";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["CannotConvertBetweenPremiumEmojiAndNormalEmoji"] = 50145] = "CannotConvertBetweenPremiumEmojiAndNormalEmoji";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["UploadedFileNotFound"] = 50146] = "UploadedFileNotFound";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["SpecifiedEmojiIsInvalid"] = 50151] = "SpecifiedEmojiIsInvalid";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["VoiceMessagesDoNotSupportAdditionalContent"] = 50159] = "VoiceMessagesDoNotSupportAdditionalContent";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["VoiceMessagesMustHaveASingleAudioAttachment"] = 50160] = "VoiceMessagesMustHaveASingleAudioAttachment";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["VoiceMessagesMustHaveSupportingMetadata"] = 50161] = "VoiceMessagesMustHaveSupportingMetadata";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["VoiceMessagesCannotBeEdited"] = 50162] = "VoiceMessagesCannotBeEdited";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["CannotDeleteGuildSubscriptionIntegration"] = 50163] = "CannotDeleteGuildSubscriptionIntegration";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["CannotSendVoiceEffectWhenUserIsServerMutedDeafenedOrSuppressed"] = 50167] = "CannotSendVoiceEffectWhenUserIsServerMutedDeafenedOrSuppressed";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["YouCannotSendVoiceMessagesInThisChannel"] = 50173] = "YouCannotSendVoiceMessagesInThisChannel";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["TheUserAccountMustFirstBeVerified"] = 50178] = "TheUserAccountMustFirstBeVerified";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["ProvidedFileDoesNotHaveAValidDuration"] = 50192] = "ProvidedFileDoesNotHaveAValidDuration";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["CannotSendMessagesToThisUserDueToHavingNoMutualGuilds"] = 50278] = "CannotSendMessagesToThisUserDueToHavingNoMutualGuilds";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["YouDoNotHavePermissionToSendThisSticker"] = 50600] = "YouDoNotHavePermissionToSendThisSticker";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["TwoFactorAuthenticationIsRequired"] = 60003] = "TwoFactorAuthenticationIsRequired";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["NoUsersWithDiscordTagExist"] = 80004] = "NoUsersWithDiscordTagExist";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["ReactionWasBlocked"] = 90001] = "ReactionWasBlocked";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["UserCannotUseBurstReactions"] = 90002] = "UserCannotUseBurstReactions";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["IndexNotYetAvailable"] = 11e4] = "IndexNotYetAvailable";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["ApplicationNotYetAvailable"] = 110001] = "ApplicationNotYetAvailable";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["APIResourceOverloaded"] = 13e4] = "APIResourceOverloaded";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["TheStageIsAlreadyOpen"] = 150006] = "TheStageIsAlreadyOpen";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["CannotReplyWithoutPermissionToReadMessageHistory"] = 160002] = "CannotReplyWithoutPermissionToReadMessageHistory";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["ThreadAlreadyCreatedForMessage"] = 160004] = "ThreadAlreadyCreatedForMessage";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["ThreadLocked"] = 160005] = "ThreadLocked";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["MaximumActiveThreads"] = 160006] = "MaximumActiveThreads";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["MaximumActiveAnnouncementThreads"] = 160007] = "MaximumActiveAnnouncementThreads";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["CannotForwardMessageWithUnreadableContent"] = 160014] = "CannotForwardMessageWithUnreadableContent";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["InvalidJSONForUploadedLottieFile"] = 170001] = "InvalidJSONForUploadedLottieFile";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["UploadedLottiesCannotContainRasterizedImages"] = 170002] = "UploadedLottiesCannotContainRasterizedImages";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["StickerMaximumFramerateExceeded"] = 170003] = "StickerMaximumFramerateExceeded";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["StickerFrameCountExceedsMaximumOf1000Frames"] = 170004] = "StickerFrameCountExceedsMaximumOf1000Frames";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["LottieAnimationMaximumDimensionsExceeded"] = 170005] = "LottieAnimationMaximumDimensionsExceeded";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["StickerFramerateIsTooSmallOrTooLarge"] = 170006] = "StickerFramerateIsTooSmallOrTooLarge";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["StickerAnimationDurationExceedsMaximumOf5Seconds"] = 170007] = "StickerAnimationDurationExceedsMaximumOf5Seconds";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["CannotUpdateAFinishedEvent"] = 18e4] = "CannotUpdateAFinishedEvent";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["FailedToCreateStageNeededForStageEvent"] = 180002] = "FailedToCreateStageNeededForStageEvent";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["MessageWasBlockedByAutomaticModeration"] = 2e5] = "MessageWasBlockedByAutomaticModeration";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["TitleWasBlockedByAutomaticModeration"] = 200001] = "TitleWasBlockedByAutomaticModeration";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["WebhooksPostedToForumChannelsMustHaveAThreadNameOrThreadId"] = 220001] = "WebhooksPostedToForumChannelsMustHaveAThreadNameOrThreadId";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["WebhooksPostedToForumChannelsCannotHaveBothAThreadNameAndThreadId"] = 220002] = "WebhooksPostedToForumChannelsCannotHaveBothAThreadNameAndThreadId";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["WebhooksCanOnlyCreateThreadsInForumChannels"] = 220003] = "WebhooksCanOnlyCreateThreadsInForumChannels";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["WebhookServicesCannotBeUsedInForumChannels"] = 220004] = "WebhookServicesCannotBeUsedInForumChannels";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["MessageBlockedByHarmfulLinksFilter"] = 24e4] = "MessageBlockedByHarmfulLinksFilter";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["AccessToJoiningNewServersHasBeenLimitedForTheUser"] = 340015] = "AccessToJoiningNewServersHasBeenLimitedForTheUser";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["CannotEnableOnboardingRequirementsAreNotMet"] = 35e4] = "CannotEnableOnboardingRequirementsAreNotMet";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["CannotUpdateOnboardingWhileBelowRequirements"] = 350001] = "CannotUpdateOnboardingWhileBelowRequirements";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["AccessToFileUploadsHasBeenLimitedForThisGuild"] = 400001] = "AccessToFileUploadsHasBeenLimitedForThisGuild";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["FailedToBanUsers"] = 5e5] = "FailedToBanUsers";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["PollVotingBlocked"] = 52e4] = "PollVotingBlocked";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["PollExpired"] = 520001] = "PollExpired";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["InvalidChannelTypeForPollCreation"] = 520002] = "InvalidChannelTypeForPollCreation";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["CannotEditAPollMessage"] = 520003] = "CannotEditAPollMessage";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["CannotUseAnEmojiIncludedWithThePoll"] = 520004] = "CannotUseAnEmojiIncludedWithThePoll";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["CannotExpireANonPollMessage"] = 520006] = "CannotExpireANonPollMessage";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["ProvisionalAccountsPermissionNotGranted"] = 53e4] = "ProvisionalAccountsPermissionNotGranted";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["IdTokenJWTExpired"] = 530001] = "IdTokenJWTExpired";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["IdTokenJWTIssuerMismatch"] = 530002] = "IdTokenJWTIssuerMismatch";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["IdTokenJWTAudienceMismatch"] = 530003] = "IdTokenJWTAudienceMismatch";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["IdTokenJWTIssuedTooLongAgo"] = 530004] = "IdTokenJWTIssuedTooLongAgo";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["FailedToGenerateUniqueUsername"] = 530006] = "FailedToGenerateUniqueUsername";
      RESTJSONErrorCodes3[RESTJSONErrorCodes3["InvalidClientSecret"] = 530007] = "InvalidClientSecret";
    })(RESTJSONErrorCodes2 || (exports2.RESTJSONErrorCodes = RESTJSONErrorCodes2 = {}));
    exports2.CannotSendMessagesToThisUserErrorCodes = [
      RESTJSONErrorCodes2.CannotSendMessagesToThisUser,
      RESTJSONErrorCodes2.CannotSendMessagesToThisUserDueToHavingNoMutualGuilds
    ];
    var Locale2;
    (function(Locale3) {
      Locale3["Indonesian"] = "id";
      Locale3["EnglishUS"] = "en-US";
      Locale3["EnglishGB"] = "en-GB";
      Locale3["Bulgarian"] = "bg";
      Locale3["ChineseCN"] = "zh-CN";
      Locale3["ChineseTW"] = "zh-TW";
      Locale3["Croatian"] = "hr";
      Locale3["Czech"] = "cs";
      Locale3["Danish"] = "da";
      Locale3["Dutch"] = "nl";
      Locale3["Finnish"] = "fi";
      Locale3["French"] = "fr";
      Locale3["German"] = "de";
      Locale3["Greek"] = "el";
      Locale3["Hindi"] = "hi";
      Locale3["Hungarian"] = "hu";
      Locale3["Italian"] = "it";
      Locale3["Japanese"] = "ja";
      Locale3["Korean"] = "ko";
      Locale3["Lithuanian"] = "lt";
      Locale3["Norwegian"] = "no";
      Locale3["Polish"] = "pl";
      Locale3["PortugueseBR"] = "pt-BR";
      Locale3["Romanian"] = "ro";
      Locale3["Russian"] = "ru";
      Locale3["SpanishES"] = "es-ES";
      Locale3["SpanishLATAM"] = "es-419";
      Locale3["Swedish"] = "sv-SE";
      Locale3["Thai"] = "th";
      Locale3["Turkish"] = "tr";
      Locale3["Ukrainian"] = "uk";
      Locale3["Vietnamese"] = "vi";
    })(Locale2 || (exports2.Locale = Locale2 = {}));
  }
});

// node_modules/discord-api-types/rest/v10/channel.js
var require_channel2 = __commonJS({
  "node_modules/discord-api-types/rest/v10/channel.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ReactionType = void 0;
    var ReactionType2;
    (function(ReactionType3) {
      ReactionType3[ReactionType3["Normal"] = 0] = "Normal";
      ReactionType3[ReactionType3["Burst"] = 1] = "Burst";
      ReactionType3[ReactionType3["Super"] = 1] = "Super";
    })(ReactionType2 || (exports2.ReactionType = ReactionType2 = {}));
  }
});

// node_modules/discord-api-types/rest/v10/invite.js
var require_invite2 = __commonJS({
  "node_modules/discord-api-types/rest/v10/invite.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.InviteTargetUsersJobStatus = void 0;
    var InviteTargetUsersJobStatus2;
    (function(InviteTargetUsersJobStatus3) {
      InviteTargetUsersJobStatus3[InviteTargetUsersJobStatus3["Unspecified"] = 0] = "Unspecified";
      InviteTargetUsersJobStatus3[InviteTargetUsersJobStatus3["Processing"] = 1] = "Processing";
      InviteTargetUsersJobStatus3[InviteTargetUsersJobStatus3["Completed"] = 2] = "Completed";
      InviteTargetUsersJobStatus3[InviteTargetUsersJobStatus3["Failed"] = 3] = "Failed";
    })(InviteTargetUsersJobStatus2 || (exports2.InviteTargetUsersJobStatus = InviteTargetUsersJobStatus2 = {}));
  }
});

// node_modules/discord-api-types/rest/v10/monetization.js
var require_monetization2 = __commonJS({
  "node_modules/discord-api-types/rest/v10/monetization.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.EntitlementOwnerType = void 0;
    var EntitlementOwnerType2;
    (function(EntitlementOwnerType3) {
      EntitlementOwnerType3[EntitlementOwnerType3["Guild"] = 1] = "Guild";
      EntitlementOwnerType3[EntitlementOwnerType3["User"] = 2] = "User";
    })(EntitlementOwnerType2 || (exports2.EntitlementOwnerType = EntitlementOwnerType2 = {}));
  }
});

// node_modules/discord-api-types/rest/v10/index.js
var require_v103 = __commonJS({
  "node_modules/discord-api-types/rest/v10/index.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p)) __createBinding(exports3, m, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.OAuth2Routes = exports2.RouteBases = exports2.CDNRoutes = exports2.ImageFormat = exports2.StickerPackApplicationId = exports2.Routes = exports2.APIVersion = void 0;
    var internals_1 = require_internals();
    __exportStar(require_common2(), exports2);
    __exportStar(require_channel2(), exports2);
    __exportStar(require_invite2(), exports2);
    __exportStar(require_monetization2(), exports2);
    exports2.APIVersion = "10";
    exports2.Routes = {
      /**
       * Route for:
       * - GET `/applications/{application.id}/role-connections/metadata`
       * - PUT `/applications/{application.id}/role-connections/metadata`
       */
      applicationRoleConnectionMetadata(applicationId) {
        return `/applications/${applicationId}/role-connections/metadata`;
      },
      /**
       * Route for:
       * - GET  `/guilds/{guild.id}/auto-moderation/rules`
       * - POST `/guilds/{guild.id}/auto-moderation/rules`
       */
      guildAutoModerationRules(guildId) {
        return `/guilds/${guildId}/auto-moderation/rules`;
      },
      /**
       * Routes for:
       * - GET    `/guilds/{guild.id}/auto-moderation/rules/{rule.id}`
       * - PATCH  `/guilds/{guild.id}/auto-moderation/rules/{rule.id}`
       * - DELETE `/guilds/{guild.id}/auto-moderation/rules/{rule.id}`
       */
      guildAutoModerationRule(guildId, ruleId) {
        return `/guilds/${guildId}/auto-moderation/rules/${ruleId}`;
      },
      /**
       * Route for:
       * - GET `/guilds/{guild.id}/audit-logs`
       */
      guildAuditLog(guildId) {
        return `/guilds/${guildId}/audit-logs`;
      },
      /**
       * Route for:
       * - GET    `/channels/{channel.id}`
       * - PATCH  `/channels/{channel.id}`
       * - DELETE `/channels/{channel.id}`
       */
      channel(channelId) {
        return `/channels/${channelId}`;
      },
      /**
       * Route for:
       * - GET  `/channels/{channel.id}/messages`
       * - POST `/channels/{channel.id}/messages`
       */
      channelMessages(channelId) {
        return `/channels/${channelId}/messages`;
      },
      /**
       * Route for:
       * - GET    `/channels/{channel.id}/messages/{message.id}`
       * - PATCH  `/channels/{channel.id}/messages/{message.id}`
       * - DELETE `/channels/{channel.id}/messages/{message.id}`
       */
      channelMessage(channelId, messageId) {
        return `/channels/${channelId}/messages/${messageId}`;
      },
      /**
       * Route for:
       * - POST `/channels/{channel.id}/messages/{message.id}/crosspost`
       */
      channelMessageCrosspost(channelId, messageId) {
        return `/channels/${channelId}/messages/${messageId}/crosspost`;
      },
      /**
       * Route for:
       * - PUT    `/channels/{channel.id}/messages/{message.id}/reactions/{emoji}/@me`
       * - DELETE `/channels/{channel.id}/messages/{message.id}/reactions/{emoji}/@me`
       *
       * **Note**: You need to URL encode the emoji yourself
       */
      channelMessageOwnReaction(channelId, messageId, emoji) {
        return `/channels/${channelId}/messages/${messageId}/reactions/${emoji}/@me`;
      },
      /**
       * Route for:
       * - DELETE `/channels/{channel.id}/messages/{message.id}/reactions/{emoji}/{user.id}`
       *
       * **Note**: You need to URL encode the emoji yourself
       */
      channelMessageUserReaction(channelId, messageId, emoji, userId) {
        return `/channels/${channelId}/messages/${messageId}/reactions/${emoji}/${userId}`;
      },
      /**
       * Route for:
       * - GET    `/channels/{channel.id}/messages/{message.id}/reactions/{emoji}`
       * - DELETE `/channels/{channel.id}/messages/{message.id}/reactions/{emoji}`
       *
       * **Note**: You need to URL encode the emoji yourself
       */
      channelMessageReaction(channelId, messageId, emoji) {
        return `/channels/${channelId}/messages/${messageId}/reactions/${emoji}`;
      },
      /**
       * Route for:
       * - DELETE `/channels/{channel.id}/messages/{message.id}/reactions`
       */
      channelMessageAllReactions(channelId, messageId) {
        return `/channels/${channelId}/messages/${messageId}/reactions`;
      },
      /**
       * Route for:
       * - POST `/channels/{channel.id}/messages/bulk-delete`
       */
      channelBulkDelete(channelId) {
        return `/channels/${channelId}/messages/bulk-delete`;
      },
      /**
       * Route for:
       * - PUT    `/channels/{channel.id}/permissions/{overwrite.id}`
       * - DELETE `/channels/{channel.id}/permissions/{overwrite.id}`
       */
      channelPermission(channelId, overwriteId) {
        return `/channels/${channelId}/permissions/${overwriteId}`;
      },
      /**
       * Route for:
       * - GET  `/channels/{channel.id}/invites`
       * - POST `/channels/{channel.id}/invites`
       */
      channelInvites(channelId) {
        return `/channels/${channelId}/invites`;
      },
      /**
       * Route for:
       * - POST `/channels/{channel.id}/followers`
       */
      channelFollowers(channelId) {
        return `/channels/${channelId}/followers`;
      },
      /**
       * Route for:
       * - POST `/channels/{channel.id}/typing`
       */
      channelTyping(channelId) {
        return `/channels/${channelId}/typing`;
      },
      /**
       * Route for:
       * - GET `/channels/{channel.id}/messages/pins`
       */
      channelMessagesPins(channelId) {
        return `/channels/${channelId}/messages/pins`;
      },
      /**
       * Route for:
       * - PUT    `/channels/{channel.id}/messages/pins/{message.id}`
       * - DELETE `/channels/{channel.id}/messages/pins/{message.id}`
       */
      channelMessagesPin(channelId, messageId) {
        return `/channels/${channelId}/messages/pins/${messageId}`;
      },
      /**
       * Route for:
       * - GET `/channels/{channel.id}/pins`
       *
       * @deprecated Use {@link Routes.channelMessagesPins} instead.
       */
      channelPins(channelId) {
        return `/channels/${channelId}/pins`;
      },
      /**
       * Route for:
       * - PUT    `/channels/{channel.id}/pins/{message.id}`
       * - DELETE `/channels/{channel.id}/pins/{message.id}`
       *
       * @deprecated Use {@link Routes.channelMessagesPin} instead.
       */
      channelPin(channelId, messageId) {
        return `/channels/${channelId}/pins/${messageId}`;
      },
      /**
       * Route for:
       * - PUT    `/channels/{channel.id}/recipients/{user.id}`
       * - DELETE `/channels/{channel.id}/recipients/{user.id}`
       */
      channelRecipient(channelId, userId) {
        return `/channels/${channelId}/recipients/${userId}`;
      },
      /**
       * Route for:
       * - PUT `/channels/{channel.id}/voice-status`
       */
      channelVoiceStatus(channelId) {
        return `/channels/${channelId}/voice-status`;
      },
      /**
       * Route for:
       * - GET  `/guilds/{guild.id}/emojis`
       * - POST `/guilds/{guild.id}/emojis`
       */
      guildEmojis(guildId) {
        return `/guilds/${guildId}/emojis`;
      },
      /**
       * Route for:
       * - GET    `/guilds/{guild.id}/emojis/{emoji.id}`
       * - PATCH  `/guilds/{guild.id}/emojis/{emoji.id}`
       * - DELETE `/guilds/{guild.id}/emojis/{emoji.id}`
       */
      guildEmoji(guildId, emojiId) {
        return `/guilds/${guildId}/emojis/${emojiId}`;
      },
      /**
       * Route for:
       * - POST `/guilds`
       *
       * @deprecated {@link https://discord.com/developers/docs/change-log#guild-create-deprecation}
       */
      guilds() {
        return "/guilds";
      },
      /**
       * Route for:
       * - GET    `/guilds/{guild.id}`
       * - PATCH  `/guilds/{guild.id}`
       * - DELETE `/guilds/{guild.id}` (**deprecated**)
       */
      guild(guildId) {
        return `/guilds/${guildId}`;
      },
      /**
       * Route for:
       * - GET `/guilds/{guild.id}/preview`
       */
      guildPreview(guildId) {
        return `/guilds/${guildId}/preview`;
      },
      /**
       * Route for:
       * - GET   `/guilds/{guild.id}/channels`
       * - POST  `/guilds/{guild.id}/channels`
       * - PATCH `/guilds/{guild.id}/channels`
       */
      guildChannels(guildId) {
        return `/guilds/${guildId}/channels`;
      },
      /**
       * Route for:
       * - GET    `/guilds/{guild.id}/members/{user.id}`
       * - PUT    `/guilds/{guild.id}/members/{user.id}`
       * - PATCH  `/guilds/{guild.id}/members/@me`
       * - PATCH  `/guilds/{guild.id}/members/{user.id}`
       * - DELETE `/guilds/{guild.id}/members/{user.id}`
       */
      guildMember(guildId, userId = "@me") {
        return `/guilds/${guildId}/members/${userId}`;
      },
      /**
       * Route for:
       * - GET `/guilds/{guild.id}/members`
       */
      guildMembers(guildId) {
        return `/guilds/${guildId}/members`;
      },
      /**
       * Route for:
       * - GET `/guilds/{guild.id}/members/search`
       */
      guildMembersSearch(guildId) {
        return `/guilds/${guildId}/members/search`;
      },
      /**
       * Route for:
       * - GET `/guilds/{guild.id}/messages/search`
       */
      guildMessagesSearch(guildId) {
        return `/guilds/${guildId}/messages/search`;
      },
      /**
       * Route for:
       * - PATCH `/guilds/{guild.id}/members/@me/nick`
       *
       * @deprecated Use {@link Routes.guildMember} instead.
       */
      guildCurrentMemberNickname(guildId) {
        return `/guilds/${guildId}/members/@me/nick`;
      },
      /**
       * Route for:
       * - PUT    `/guilds/{guild.id}/members/{user.id}/roles/{role.id}`
       * - DELETE `/guilds/{guild.id}/members/{user.id}/roles/{role.id}`
       */
      guildMemberRole(guildId, memberId, roleId) {
        return `/guilds/${guildId}/members/${memberId}/roles/${roleId}`;
      },
      /**
       * Route for:
       * - POST `/guilds/{guild.id}/mfa`
       *
       * @deprecated
       */
      guildMFA(guildId) {
        return `/guilds/${guildId}/mfa`;
      },
      /**
       * Route for:
       * - GET `/guilds/{guild.id}/bans`
       */
      guildBans(guildId) {
        return `/guilds/${guildId}/bans`;
      },
      /**
       * Route for:
       * - GET    `/guilds/{guild.id}/bans/{user.id}`
       * - PUT    `/guilds/{guild.id}/bans/{user.id}`
       * - DELETE `/guilds/{guild.id}/bans/{user.id}`
       */
      guildBan(guildId, userId) {
        return `/guilds/${guildId}/bans/${userId}`;
      },
      /**
       * Route for:
       * - GET   `/guilds/{guild.id}/roles`
       * - POST  `/guilds/{guild.id}/roles`
       * - PATCH `/guilds/{guild.id}/roles`
       */
      guildRoles(guildId) {
        return `/guilds/${guildId}/roles`;
      },
      /**
       * Route for:
       * - GET    `/guilds/{guild.id}/roles/{role.id}`
       * - PATCH  `/guilds/{guild.id}/roles/{role.id}`
       * - DELETE `/guilds/{guild.id}/roles/{role.id}`
       */
      guildRole(guildId, roleId) {
        return `/guilds/${guildId}/roles/${roleId}`;
      },
      /**
       * Route for:
       * - GET `/guilds/{guild.id}/roles/member-counts`
       */
      guildRoleMemberCounts(guildId) {
        return `/guilds/${guildId}/roles/member-counts`;
      },
      /**
       * Route for:
       * - GET  `/guilds/{guild.id}/prune`
       * - POST `/guilds/{guild.id}/prune`
       */
      guildPrune(guildId) {
        return `/guilds/${guildId}/prune`;
      },
      /**
       * Route for:
       * - GET `/guilds/{guild.id}/regions`
       */
      guildVoiceRegions(guildId) {
        return `/guilds/${guildId}/regions`;
      },
      /**
       * Route for:
       * - GET `/guilds/{guild.id}/invites`
       */
      guildInvites(guildId) {
        return `/guilds/${guildId}/invites`;
      },
      /**
       * Route for:
       * - GET  `/guilds/{guild.id}/integrations`
       */
      guildIntegrations(guildId) {
        return `/guilds/${guildId}/integrations`;
      },
      /**
       * Route for:
       * - DELETE `/guilds/{guild.id}/integrations/{integration.id}`
       */
      guildIntegration(guildId, integrationId) {
        return `/guilds/${guildId}/integrations/${integrationId}`;
      },
      /**
       * Route for:
       * - GET   `/guilds/{guild.id}/widget`
       * - PATCH `/guilds/{guild.id}/widget`
       */
      guildWidgetSettings(guildId) {
        return `/guilds/${guildId}/widget`;
      },
      /**
       * Route for:
       * - GET `/guilds/{guild.id}/widget.json`
       */
      guildWidgetJSON(guildId) {
        return `/guilds/${guildId}/widget.json`;
      },
      /**
       * Route for:
       * - GET `/guilds/{guild.id}/vanity-url`
       */
      guildVanityUrl(guildId) {
        return `/guilds/${guildId}/vanity-url`;
      },
      /**
       * Route for:
       * - GET `/guilds/{guild.id}/widget.png`
       */
      guildWidgetImage(guildId) {
        return `/guilds/${guildId}/widget.png`;
      },
      /**
       * Route for:
       * - GET    `/invites/{invite.code}`
       * - DELETE `/invites/{invite.code}`
       */
      invite(code) {
        return `/invites/${code}`;
      },
      /**
       * Route for:
       * - GET `/invites/{invite.code}/target-users`
       * - PUT `/invites/{invite.code}/target-users`
       */
      inviteTargetUsers(code) {
        return `/invites/${code}/target-users`;
      },
      /**
       * Route for:
       * - GET `/invites/{invite.code}/target-users/job-status`
       */
      inviteTargetUsersJobStatus(code) {
        return `/invites/${code}/target-users/job-status`;
      },
      /**
       * Route for:
       * - GET  `/guilds/templates/{template.code}`
       * - POST `/guilds/templates/{template.code}` (**deprecated**)
       */
      template(code) {
        return `/guilds/templates/${code}`;
      },
      /**
       * Route for:
       * - GET  `/guilds/{guild.id}/templates`
       * - POST `/guilds/{guild.id}/templates`
       */
      guildTemplates(guildId) {
        return `/guilds/${guildId}/templates`;
      },
      /**
       * Route for:
       * - PUT    `/guilds/{guild.id}/templates/{template.code}`
       * - PATCH  `/guilds/{guild.id}/templates/{template.code}`
       * - DELETE `/guilds/{guild.id}/templates/{template.code}`
       */
      guildTemplate(guildId, code) {
        return `/guilds/${guildId}/templates/${code}`;
      },
      /**
       * Route for:
       * - GET `/channels/{channel.id}/polls/{message.id}/answers/{answer_id}`
       */
      pollAnswerVoters(channelId, messageId, answerId) {
        return `/channels/${channelId}/polls/${messageId}/answers/${answerId}`;
      },
      /**
       * Route for:
       * - POST `/channels/{channel.id}/polls/{message.id}/expire`
       */
      expirePoll(channelId, messageId) {
        return `/channels/${channelId}/polls/${messageId}/expire`;
      },
      /**
       * Route for:
       * - POST `/channels/{channel.id}/threads`
       * - POST `/channels/{channel.id}/messages/{message.id}/threads`
       */
      threads(parentId, messageId) {
        const parts = ["", "channels", parentId];
        if (messageId)
          parts.push("messages", messageId);
        parts.push("threads");
        return parts.join("/");
      },
      /**
       * Route for:
       * - GET `/guilds/{guild.id}/threads/active`
       */
      guildActiveThreads(guildId) {
        return `/guilds/${guildId}/threads/active`;
      },
      /**
       * Route for:
       * - GET `/channels/{channel.id}/threads/archived/public`
       * - GET `/channels/{channel.id}/threads/archived/private`
       */
      channelThreads(channelId, archivedStatus) {
        return `/channels/${channelId}/threads/archived/${archivedStatus}`;
      },
      /**
       * Route for:
       * - GET `/channels/{channel.id}/users/@me/threads/archived/private`
       */
      channelJoinedArchivedThreads(channelId) {
        return `/channels/${channelId}/users/@me/threads/archived/private`;
      },
      /**
       * Route for:
       * - GET    `/channels/{thread.id}/thread-members`
       * - GET    `/channels/{thread.id}/thread-members/{user.id}`
       * - PUT    `/channels/{thread.id}/thread-members/@me`
       * - PUT    `/channels/{thread.id}/thread-members/{user.id}`
       * - DELETE `/channels/{thread.id}/thread-members/@me`
       * - DELETE `/channels/{thread.id}/thread-members/{user.id}`
       */
      threadMembers(threadId, userId) {
        const parts = ["", "channels", threadId, "thread-members"];
        if (userId)
          parts.push(userId);
        return parts.join("/");
      },
      /**
       * Route for:
       * - GET   `/users/@me`
       * - GET   `/users/{user.id}`
       * - PATCH `/users/@me`
       *
       * @param userId - The user ID, defaulted to `@me`
       */
      user(userId = "@me") {
        return `/users/${userId}`;
      },
      /**
       * Route for:
       * - GET    `/users/@me/applications/{application.id}/role-connection`
       * - PUT    `/users/@me/applications/{application.id}/role-connection`
       * - DELETE `/users/@me/applications/{application.id}/role-connection`
       */
      userApplicationRoleConnection(applicationId) {
        return `/users/@me/applications/${applicationId}/role-connection`;
      },
      /**
       * Route for:
       * - GET `/users/@me/guilds`
       */
      userGuilds() {
        return `/users/@me/guilds`;
      },
      /**
       * Route for:
       * - GET `/users/@me/guilds/{guild.id}/member`
       */
      userGuildMember(guildId) {
        return `/users/@me/guilds/${guildId}/member`;
      },
      /**
       * Route for:
       * - DELETE `/users/@me/guilds/{guild.id}`
       */
      userGuild(guildId) {
        return `/users/@me/guilds/${guildId}`;
      },
      /**
       * Route for:
       * - POST `/users/@me/channels`
       */
      userChannels() {
        return `/users/@me/channels`;
      },
      /**
       * Route for:
       * - GET `/users/@me/connections`
       */
      userConnections() {
        return `/users/@me/connections`;
      },
      /**
       * Route for:
       * - GET `/voice/regions`
       */
      voiceRegions() {
        return `/voice/regions`;
      },
      /**
       * Route for:
       * - GET  `/channels/{channel.id}/webhooks`
       * - POST `/channels/{channel.id}/webhooks`
       */
      channelWebhooks(channelId) {
        return `/channels/${channelId}/webhooks`;
      },
      /**
       * Route for:
       * - GET `/guilds/{guild.id}/webhooks`
       */
      guildWebhooks(guildId) {
        return `/guilds/${guildId}/webhooks`;
      },
      /**
       * Route for:
       * - GET    `/webhooks/{webhook.id}`
       * - GET    `/webhooks/{webhook.id}/{webhook.token}`
       * - PATCH  `/webhooks/{webhook.id}`
       * - PATCH  `/webhooks/{webhook.id}/{webhook.token}`
       * - DELETE `/webhooks/{webhook.id}`
       * - DELETE `/webhooks/{webhook.id}/{webhook.token}`
       * - POST   `/webhooks/{webhook.id}/{webhook.token}`
       *
       * - POST   `/webhooks/{application.id}/{interaction.token}`
       */
      webhook(webhookId, webhookToken) {
        const parts = ["", "webhooks", webhookId];
        if (webhookToken)
          parts.push(webhookToken);
        return parts.join("/");
      },
      /**
       * Route for:
       * - GET    `/webhooks/{webhook.id}/{webhook.token}/messages/@original`
       * - GET    `/webhooks/{webhook.id}/{webhook.token}/messages/{message.id}`
       * - PATCH  `/webhooks/{webhook.id}/{webhook.token}/messages/@original`
       * - PATCH  `/webhooks/{webhook.id}/{webhook.token}/messages/{message.id}`
       * - DELETE `/webhooks/{webhook.id}/{webhook.token}/messages/@original`
       * - DELETE `/webhooks/{webhook.id}/{webhook.token}/messages/{message.id}`
       *
       * - PATCH  `/webhooks/{application.id}/{interaction.token}/messages/@original`
       * - PATCH  `/webhooks/{application.id}/{interaction.token}/messages/{message.id}`
       * - DELETE `/webhooks/{application.id}/{interaction.token}/messages/{message.id}`
       */
      webhookMessage(webhookId, webhookToken, messageId = "@original") {
        return `/webhooks/${webhookId}/${webhookToken}/messages/${messageId}`;
      },
      /**
       * Route for:
       * - POST `/webhooks/{webhook.id}/{webhook.token}/github`
       * - POST `/webhooks/{webhook.id}/{webhook.token}/slack`
       */
      webhookPlatform(webhookId, webhookToken, platform) {
        return `/webhooks/${webhookId}/${webhookToken}/${platform}`;
      },
      /**
       * Route for:
       * - GET `/gateway`
       */
      gateway() {
        return `/gateway`;
      },
      /**
       * Route for:
       * - GET `/gateway/bot`
       */
      gatewayBot() {
        return `/gateway/bot`;
      },
      /**
       * Route for:
       * - GET `/oauth2/applications/@me`
       */
      oauth2CurrentApplication() {
        return `/oauth2/applications/@me`;
      },
      /**
       * Route for:
       * - GET `/oauth2/@me`
       */
      oauth2CurrentAuthorization() {
        return `/oauth2/@me`;
      },
      /**
       * Route for:
       * - GET `/oauth2/authorize`
       */
      oauth2Authorization() {
        return `/oauth2/authorize`;
      },
      /**
       * Route for:
       * - POST `/oauth2/token`
       */
      oauth2TokenExchange() {
        return `/oauth2/token`;
      },
      /**
       * Route for:
       * - POST `/oauth2/token/revoke`
       */
      oauth2TokenRevocation() {
        return `/oauth2/token/revoke`;
      },
      /**
       * Route for:
       * - GET  `/applications/{application.id}/commands`
       * - PUT  `/applications/{application.id}/commands`
       * - POST `/applications/{application.id}/commands`
       */
      applicationCommands(applicationId) {
        return `/applications/${applicationId}/commands`;
      },
      /**
       * Route for:
       * - GET    `/applications/{application.id}/commands/{command.id}`
       * - PATCH  `/applications/{application.id}/commands/{command.id}`
       * - DELETE `/applications/{application.id}/commands/{command.id}`
       */
      applicationCommand(applicationId, commandId) {
        return `/applications/${applicationId}/commands/${commandId}`;
      },
      /**
       * Route for:
       * - GET  `/applications/{application.id}/guilds/{guild.id}/commands`
       * - PUT  `/applications/{application.id}/guilds/{guild.id}/commands`
       * - POST `/applications/{application.id}/guilds/{guild.id}/commands`
       */
      applicationGuildCommands(applicationId, guildId) {
        return `/applications/${applicationId}/guilds/${guildId}/commands`;
      },
      /**
       * Route for:
       * - GET    `/applications/{application.id}/guilds/{guild.id}/commands/{command.id}`
       * - PATCH  `/applications/{application.id}/guilds/{guild.id}/commands/{command.id}`
       * - DELETE `/applications/{application.id}/guilds/{guild.id}/commands/{command.id}`
       */
      applicationGuildCommand(applicationId, guildId, commandId) {
        return `/applications/${applicationId}/guilds/${guildId}/commands/${commandId}`;
      },
      /**
       * Route for:
       * - POST `/interactions/{interaction.id}/{interaction.token}/callback`
       */
      interactionCallback(interactionId, interactionToken) {
        return `/interactions/${interactionId}/${interactionToken}/callback`;
      },
      /**
       * Route for:
       * - GET   `/guilds/{guild.id}/member-verification`
       * - PATCH `/guilds/{guild.id}/member-verification`
       *
       * @unstable https://github.com/discord/discord-api-docs/pull/2547
       */
      guildMemberVerification(guildId) {
        return `/guilds/${guildId}/member-verification`;
      },
      /**
       * Route for:
       * - GET `/guilds/{guild.id}/voice-states/@me`
       * - GET `/guilds/{guild.id}/voice-states/{user.id}`
       * - PATCH `/guilds/{guild.id}/voice-states/@me`
       * - PATCH `/guilds/{guild.id}/voice-states/{user.id}`
       */
      guildVoiceState(guildId, userId = "@me") {
        return `/guilds/${guildId}/voice-states/${userId}`;
      },
      /**
       * Route for:
       * - GET `/applications/{application.id}/guilds/{guild.id}/commands/permissions`
       * - PUT `/applications/{application.id}/guilds/{guild.id}/commands/permissions`
       */
      guildApplicationCommandsPermissions(applicationId, guildId) {
        return `/applications/${applicationId}/guilds/${guildId}/commands/permissions`;
      },
      /**
       * Route for:
       * - GET `/applications/{application.id}/guilds/{guild.id}/commands/{command.id}/permissions`
       * - PUT `/applications/{application.id}/guilds/{guild.id}/commands/{command.id}/permissions`
       */
      applicationCommandPermissions(applicationId, guildId, commandId) {
        return `/applications/${applicationId}/guilds/${guildId}/commands/${commandId}/permissions`;
      },
      /**
       * Route for:
       * - GET   `/guilds/{guild.id}/welcome-screen`
       * - PATCH `/guilds/{guild.id}/welcome-screen`
       */
      guildWelcomeScreen(guildId) {
        return `/guilds/${guildId}/welcome-screen`;
      },
      /**
       * Route for:
       * - POST `/stage-instances`
       */
      stageInstances() {
        return `/stage-instances`;
      },
      /**
       * Route for:
       * - GET `/stage-instances/{channel.id}`
       * - PATCH `/stage-instances/{channel.id}`
       * - DELETE `/stage-instances/{channel.id}`
       */
      stageInstance(channelId) {
        return `/stage-instances/${channelId}`;
      },
      /**
       * Route for:
       * - GET `/stickers/{sticker.id}`
       */
      sticker(stickerId) {
        return `/stickers/${stickerId}`;
      },
      /**
       * Route for:
       * - GET `/sticker-packs`
       */
      stickerPacks() {
        return "/sticker-packs";
      },
      /**
       * Route for:
       * - GET `/sticker-packs/{pack.id}`
       */
      stickerPack(packId) {
        return `/sticker-packs/${packId}`;
      },
      /**
       * Route for:
       * - GET `/sticker-packs`
       *
       * @deprecated Use {@link Routes.stickerPacks} instead.
       */
      nitroStickerPacks() {
        return "/sticker-packs";
      },
      /**
       * Route for:
       * - GET  `/guilds/{guild.id}/stickers`
       * - POST `/guilds/{guild.id}/stickers`
       */
      guildStickers(guildId) {
        return `/guilds/${guildId}/stickers`;
      },
      /**
       * Route for:
       * - GET    `/guilds/{guild.id}/stickers/{sticker.id}`
       * - PATCH  `/guilds/{guild.id}/stickers/{sticker.id}`
       * - DELETE `/guilds/{guild.id}/stickers/{sticker.id}`
       */
      guildSticker(guildId, stickerId) {
        return `/guilds/${guildId}/stickers/${stickerId}`;
      },
      /**
       * Route for:
       * - GET  `/guilds/{guild.id}/scheduled-events`
       * - POST `/guilds/{guild.id}/scheduled-events`
       */
      guildScheduledEvents(guildId) {
        return `/guilds/${guildId}/scheduled-events`;
      },
      /**
       * Route for:
       * - GET  `/guilds/{guild.id}/scheduled-events/{guildScheduledEvent.id}`
       * - PATCH `/guilds/{guild.id}/scheduled-events/{guildScheduledEvent.id}`
       * - DELETE `/guilds/{guild.id}/scheduled-events/{guildScheduledEvent.id}`
       */
      guildScheduledEvent(guildId, guildScheduledEventId) {
        return `/guilds/${guildId}/scheduled-events/${guildScheduledEventId}`;
      },
      /**
       * Route for:
       * - GET `/guilds/{guild.id}/scheduled-events/{guildScheduledEvent.id}/users`
       */
      guildScheduledEventUsers(guildId, guildScheduledEventId) {
        return `/guilds/${guildId}/scheduled-events/${guildScheduledEventId}/users`;
      },
      /**
       * Route for:
       * - GET `/guilds/{guild.id}/onboarding`
       * - PUT `/guilds/{guild.id}/onboarding`
       */
      guildOnboarding(guildId) {
        return `/guilds/${guildId}/onboarding`;
      },
      /**
       * Route for:
       * - PUT `/guilds/${guild.id}/incident-actions`
       */
      guildIncidentActions(guildId) {
        return `/guilds/${guildId}/incident-actions`;
      },
      /**
       * Route for:
       * - GET `/applications/@me`
       * - PATCH `/applications/@me`
       */
      currentApplication() {
        return "/applications/@me";
      },
      /**
       * Route for:
       * - GET `/applications/{application.id}/activity-instances/{instance_id}`
       */
      applicationActivityInstance(applicationId, instanceId) {
        return `/applications/${applicationId}/activity-instances/${instanceId}`;
      },
      /**
       * Route for:
       * - GET `/applications/{application.id}/entitlements`
       * - POST `/applications/{application.id}/entitlements`
       */
      entitlements(applicationId) {
        return `/applications/${applicationId}/entitlements`;
      },
      /**
       * Route for:
       * - GET `/applications/{application.id}/entitlements/{entitlement.id}`
       * - DELETE `/applications/{application.id}/entitlements/{entitlement.id}`
       */
      entitlement(applicationId, entitlementId) {
        return `/applications/${applicationId}/entitlements/${entitlementId}`;
      },
      /**
       * Route for:
       * - GET `/applications/{application.id}/skus`
       */
      skus(applicationId) {
        return `/applications/${applicationId}/skus`;
      },
      /**
       * Route for:
       * - POST `/guilds/{guild.id}/bulk-ban`
       */
      guildBulkBan(guildId) {
        return `/guilds/${guildId}/bulk-ban`;
      },
      /**
       * Route for:
       * - POST `/applications/{application.id}/entitlements/{entitlement.id}/consume`
       */
      consumeEntitlement(applicationId, entitlementId) {
        return `/applications/${applicationId}/entitlements/${entitlementId}/consume`;
      },
      /**
       * Route for:
       * - GET `/applications/{application.id}/emojis`
       * - POST `/applications/{application.id}/emojis`
       */
      applicationEmojis(applicationId) {
        return `/applications/${applicationId}/emojis`;
      },
      /**
       * Route for:
       * - GET `/applications/{application.id}/emojis/{emoji.id}`
       * - PATCH `/applications/{application.id}/emojis/{emoji.id}`
       * - DELETE `/applications/{application.id}/emojis/{emoji.id}`
       */
      applicationEmoji(applicationId, emojiId) {
        return `/applications/${applicationId}/emojis/${emojiId}`;
      },
      /**
       * Route for:
       * - GET `/skus/{sku.id}/subscriptions`
       */
      skuSubscriptions(skuId) {
        return `/skus/${skuId}/subscriptions`;
      },
      /**
       * Route for:
       * - GET `/skus/{sku.id}/subscriptions/{subscription.id}`
       */
      skuSubscription(skuId, subscriptionId) {
        return `/skus/${skuId}/subscriptions/${subscriptionId}`;
      },
      /**
       * Route for:
       * - POST `/channels/{channel.id}/send-soundboard-sound`
       */
      sendSoundboardSound(channelId) {
        return `/channels/${channelId}/send-soundboard-sound`;
      },
      /**
       * Route for:
       * - GET `/soundboard-default-sounds`
       */
      soundboardDefaultSounds() {
        return "/soundboard-default-sounds";
      },
      /**
       * Route for:
       * - GET `/guilds/{guild.id}/soundboard-sounds`
       * - POST `/guilds/{guild.id}/soundboard-sounds`
       */
      guildSoundboardSounds(guildId) {
        return `/guilds/${guildId}/soundboard-sounds`;
      },
      /**
       * Route for:
       * - GET `/guilds/{guild.id}/soundboard-sounds/{sound.id}`
       * - PATCH `/guilds/{guild.id}/soundboard-sounds/{sound.id}`
       * - DELETE `/guilds/{guild.id}/soundboard-sounds/{sound.id}`
       */
      guildSoundboardSound(guildId, soundId) {
        return `/guilds/${guildId}/soundboard-sounds/${soundId}`;
      }
    };
    for (const [key, fn] of Object.entries(exports2.Routes)) {
      exports2.Routes[key] = ((...args) => {
        const escaped = args.map((arg) => {
          if (arg) {
            if (internals_1.urlSafeCharacters.test(String(arg))) {
              return arg;
            }
            return encodeURIComponent(arg);
          }
          return arg;
        });
        return fn.call(null, ...escaped);
      });
    }
    Object.freeze(exports2.Routes);
    exports2.StickerPackApplicationId = "710982414301790216";
    var ImageFormat2;
    (function(ImageFormat3) {
      ImageFormat3["JPEG"] = "jpeg";
      ImageFormat3["PNG"] = "png";
      ImageFormat3["WebP"] = "webp";
      ImageFormat3["GIF"] = "gif";
      ImageFormat3["Lottie"] = "json";
    })(ImageFormat2 || (exports2.ImageFormat = ImageFormat2 = {}));
    exports2.CDNRoutes = {
      /**
       * Route for:
       * - GET `/emojis/{emoji.id}.{png|jpeg|webp|gif}`
       *
       * As this route supports GIFs, the hash will begin with `a_` if it is available in GIF format
       *
       * This route supports the extensions: PNG, JPEG, WebP, GIF
       */
      emoji(emojiId, format) {
        return `/emojis/${emojiId}.${format}`;
      },
      /**
       * Route for:
       * - GET `/icons/{guild.id}/{guild.icon}.{png|jpeg|webp|gif}`
       *
       * As this route supports GIFs, the hash will begin with `a_` if it is available in GIF format
       *
       * This route supports the extensions: PNG, JPEG, WebP, GIF
       */
      guildIcon(guildId, guildIcon, format) {
        return `/icons/${guildId}/${guildIcon}.${format}`;
      },
      /**
       * Route for:
       * - GET `/splashes/{guild.id}/{guild.splash}.{png|jpeg|webp}`
       *
       * This route supports the extensions: PNG, JPEG, WebP
       */
      guildSplash(guildId, guildSplash, format) {
        return `/splashes/${guildId}/${guildSplash}.${format}`;
      },
      /**
       * Route for:
       * - GET `/discovery-splashes/{guild.id}/{guild.discovery_splash}.{png|jpeg|webp}`
       *
       * This route supports the extensions: PNG, JPEG, WebP
       */
      guildDiscoverySplash(guildId, guildDiscoverySplash, format) {
        return `/discovery-splashes/${guildId}/${guildDiscoverySplash}.${format}`;
      },
      /**
       * Route for:
       * - GET `/banners/{guild.id}/{guild.banner}.{png|jpeg|webp|gif}`
       *
       * As this route supports GIFs, the hash will begin with `a_` if it is available in GIF format
       *
       * This route supports the extensions: PNG, JPEG, WebP, GIF
       */
      guildBanner(guildId, guildBanner, format) {
        return `/banners/${guildId}/${guildBanner}.${format}`;
      },
      /**
       * Route for:
       * - GET `/banners/{user.id}/{user.banner}.{png|jpeg|webp|gif}`
       *
       * As this route supports GIFs, the hash will begin with `a_` if it is available in GIF format
       *
       * This route supports the extensions: PNG, JPEG, WebP, GIF
       */
      userBanner(userId, userBanner, format) {
        return `/banners/${userId}/${userBanner}.${format}`;
      },
      /**
       * Route for:
       * - GET `/embed/avatars/{index}.png`
       *
       * The value for `index` parameter depends on whether the user is {@link https://discord.com/developers/docs/change-log#unique-usernames-on-discord | migrated to the new username system}.
       * For users on the new username system, `index` will be `(user.id >> 22) % 6`.
       * For users on the legacy username system, `index` will be `user.discriminator % 5`.
       *
       * This route supports the extension: PNG
       */
      defaultUserAvatar(index) {
        return `/embed/avatars/${index}.png`;
      },
      /**
       * Route for:
       * - GET `/avatars/{user.id}/{user.avatar}.{png|jpeg|webp|gif}`
       *
       * As this route supports GIFs, the hash will begin with `a_` if it is available in GIF format
       *
       * This route supports the extensions: PNG, JPEG, WebP, GIF
       */
      userAvatar(userId, userAvatar, format) {
        return `/avatars/${userId}/${userAvatar}.${format}`;
      },
      /**
       * Route for:
       * - GET `/guilds/{guild.id}/users/{user.id}/avatars/{guild_member.avatar}.{png|jpeg|webp|gif}`
       *
       * As this route supports GIFs, the hash will begin with `a_` if it is available in GIF format
       *
       * This route supports the extensions: PNG, JPEG, WebP, GIF
       */
      guildMemberAvatar(guildId, userId, memberAvatar, format) {
        return `/guilds/${guildId}/users/${userId}/avatars/${memberAvatar}.${format}`;
      },
      /**
       * Route for:
       * - GET `/avatar-decorations/{user.id}/{user.avatar_decoration}.png`
       *
       * This route supports the extension: PNG
       *
       * @deprecated Use {@link CDNRoutes.avatarDecoration} instead.
       */
      userAvatarDecoration(userId, userAvatarDecoration) {
        return `/avatar-decorations/${userId}/${userAvatarDecoration}.png`;
      },
      /**
       * Route for:
       * - GET `/avatar-decoration-presets/{avatar_decoration_data_asset}.png`
       *
       * This route supports the extension: PNG
       */
      avatarDecoration(avatarDecorationDataAsset) {
        return `/avatar-decoration-presets/${avatarDecorationDataAsset}.png`;
      },
      /**
       * Route for:
       * - GET `/app-icons/{application.id}/{application.icon}.{png|jpeg|webp}`
       *
       * This route supports the extensions: PNG, JPEG, WebP
       */
      applicationIcon(applicationId, applicationIcon, format) {
        return `/app-icons/${applicationId}/${applicationIcon}.${format}`;
      },
      /**
       * Route for:
       * - GET `/app-icons/{application.id}/{application.cover_image}.{png|jpeg|webp}`
       *
       * This route supports the extensions: PNG, JPEG, WebP
       */
      applicationCover(applicationId, applicationCoverImage, format) {
        return `/app-icons/${applicationId}/${applicationCoverImage}.${format}`;
      },
      /**
       * Route for:
       * - GET `/app-assets/{application.id}/{application.asset_id}.{png|jpeg|webp}`
       *
       * This route supports the extensions: PNG, JPEG, WebP
       */
      applicationAsset(applicationId, applicationAssetId, format) {
        return `/app-assets/${applicationId}/${applicationAssetId}.${format}`;
      },
      /**
       * Route for:
       * - GET `/app-assets/{application.id}/achievements/{achievement.id}/icons/{achievement.icon}.{png|jpeg|webp}`
       *
       * This route supports the extensions: PNG, JPEG, WebP
       */
      achievementIcon(applicationId, achievementId, achievementIconHash, format) {
        return `/app-assets/${applicationId}/achievements/${achievementId}/icons/${achievementIconHash}.${format}`;
      },
      /**
       * Route for:
       * - GET `/app-assets/710982414301790216/store/{sticker_pack.banner.asset_id}.{png|jpeg|webp}`
       *
       * This route supports the extensions: PNG, JPEG, WebP
       */
      stickerPackBanner(stickerPackBannerAssetId, format) {
        return `/app-assets/${exports2.StickerPackApplicationId}/store/${stickerPackBannerAssetId}.${format}`;
      },
      /**
       * Route for:
       * - GET `/app-assets/${application.id}/store/${asset.id}.{png|jpeg|webp}}`
       *
       * This route supports the extensions: PNG, JPEG, WebP
       */
      storePageAsset(applicationId, assetId, format = ImageFormat2.PNG) {
        return `/app-assets/${applicationId}/store/${assetId}.${format}`;
      },
      /**
       * Route for:
       * - GET `/team-icons/{team.id}/{team.icon}.{png|jpeg|webp}`
       *
       * This route supports the extensions: PNG, JPEG, WebP
       */
      teamIcon(teamId, teamIcon, format) {
        return `/team-icons/${teamId}/${teamIcon}.${format}`;
      },
      /**
       * Route for:
       * - GET `/stickers/{sticker.id}.{png|json}`
       *
       * This route supports the extensions: PNG, Lottie, GIF
       */
      sticker(stickerId, format) {
        return `/stickers/${stickerId}.${format}`;
      },
      /**
       * Route for:
       * - GET `/role-icons/{role.id}/{role.icon}.{png|jpeg|webp}`
       *
       * This route supports the extensions: PNG, JPEG, WebP
       */
      roleIcon(roleId, roleIcon, format) {
        return `/role-icons/${roleId}/${roleIcon}.${format}`;
      },
      /**
       * Route for:
       * - GET `/guild-events/{guild_scheduled_event.id}/{guild_scheduled_event.image}.{png|jpeg|webp}`
       *
       * This route supports the extensions: PNG, JPEG, WebP
       */
      guildScheduledEventCover(guildScheduledEventId, guildScheduledEventCoverImage, format) {
        return `/guild-events/${guildScheduledEventId}/${guildScheduledEventCoverImage}.${format}`;
      },
      /**
       * Route for:
       * - GET `/guilds/${guild.id}/users/${user.id}/banners/${guild_member.banner}.{png|jpeg|webp|gif}`
       *
       * This route supports the extensions: PNG, JPEG, WebP, GIF
       */
      guildMemberBanner(guildId, userId, guildMemberBanner, format) {
        return `/guilds/${guildId}/users/${userId}/banners/${guildMemberBanner}.${format}`;
      },
      /**
       * Route for:
       * - GET `/soundboard-sounds/${sound.id}`
       */
      soundboardSound(soundId) {
        return `/soundboard-sounds/${soundId}`;
      },
      /**
       * Route for:
       * - GET `/guild-tag-badges/{guild.id}/{badge}.{png|jpeg|webp}`
       *
       * This route supports the extensions: PNG, JPEG, WebP
       */
      guildTagBadge(guildId, guildTagBadge, format) {
        return `/guild-tag-badges/${guildId}/${guildTagBadge}.${format}`;
      }
    };
    for (const [key, fn] of Object.entries(exports2.CDNRoutes)) {
      exports2.CDNRoutes[key] = ((...args) => {
        const escaped = args.map((arg) => {
          if (arg) {
            if (internals_1.urlSafeCharacters.test(String(arg))) {
              return arg;
            }
            return encodeURIComponent(arg);
          }
          return arg;
        });
        return fn.call(null, ...escaped);
      });
    }
    Object.freeze(exports2.CDNRoutes);
    exports2.RouteBases = {
      api: `https://discord.com/api/v${exports2.APIVersion}`,
      cdn: "https://cdn.discordapp.com",
      media: "https://media.discordapp.net",
      invite: "https://discord.gg",
      template: "https://discord.new",
      gift: "https://discord.gift",
      scheduledEvent: "https://discord.com/events"
    };
    Object.freeze(exports2.RouteBases);
    exports2.OAuth2Routes = {
      authorizationURL: `${exports2.RouteBases.api}${exports2.Routes.oauth2Authorization()}`,
      tokenURL: `${exports2.RouteBases.api}${exports2.Routes.oauth2TokenExchange()}`,
      /**
       * @see {@link https://tools.ietf.org/html/rfc7009}
       */
      tokenRevocationURL: `${exports2.RouteBases.api}${exports2.Routes.oauth2TokenRevocation()}`
    };
    Object.freeze(exports2.OAuth2Routes);
  }
});

// node_modules/discord-api-types/rpc/common.js
var require_common3 = __commonJS({
  "node_modules/discord-api-types/rpc/common.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.RPCCloseEventCodes = exports2.RPCErrorCodes = exports2.RelationshipType = exports2.VoiceConnectionStates = exports2.RPCVoiceShortcutKeyComboKeyType = exports2.RPCVoiceSettingsModeType = exports2.RPCDeviceType = void 0;
    var RPCDeviceType2;
    (function(RPCDeviceType3) {
      RPCDeviceType3["AudioInput"] = "audioinput";
      RPCDeviceType3["AudioOutput"] = "audiooutput";
      RPCDeviceType3["VideoInput"] = "videoinput";
    })(RPCDeviceType2 || (exports2.RPCDeviceType = RPCDeviceType2 = {}));
    var RPCVoiceSettingsModeType2;
    (function(RPCVoiceSettingsModeType3) {
      RPCVoiceSettingsModeType3["PushToTalk"] = "PUSH_TO_TALK";
      RPCVoiceSettingsModeType3["VoiceActivity"] = "VOICE_ACTIVITY";
    })(RPCVoiceSettingsModeType2 || (exports2.RPCVoiceSettingsModeType = RPCVoiceSettingsModeType2 = {}));
    var RPCVoiceShortcutKeyComboKeyType2;
    (function(RPCVoiceShortcutKeyComboKeyType3) {
      RPCVoiceShortcutKeyComboKeyType3[RPCVoiceShortcutKeyComboKeyType3["KeyboardKey"] = 0] = "KeyboardKey";
      RPCVoiceShortcutKeyComboKeyType3[RPCVoiceShortcutKeyComboKeyType3["MouseButton"] = 1] = "MouseButton";
      RPCVoiceShortcutKeyComboKeyType3[RPCVoiceShortcutKeyComboKeyType3["KeyboardModifierKey"] = 2] = "KeyboardModifierKey";
      RPCVoiceShortcutKeyComboKeyType3[RPCVoiceShortcutKeyComboKeyType3["GamepadButton"] = 3] = "GamepadButton";
    })(RPCVoiceShortcutKeyComboKeyType2 || (exports2.RPCVoiceShortcutKeyComboKeyType = RPCVoiceShortcutKeyComboKeyType2 = {}));
    var VoiceConnectionStates2;
    (function(VoiceConnectionStates3) {
      VoiceConnectionStates3["Disconnected"] = "DISCONNECTED";
      VoiceConnectionStates3["AwaitingEndpoint"] = "AWAITING_ENDPOINT";
      VoiceConnectionStates3["Authenticating"] = "AUTHENTICATING";
      VoiceConnectionStates3["Connecting"] = "CONNECTING";
      VoiceConnectionStates3["Connected"] = "CONNECTED";
      VoiceConnectionStates3["VoiceDisconnected"] = "VOICE_DISCONNECTED";
      VoiceConnectionStates3["VoiceConnecting"] = "VOICE_CONNECTING";
      VoiceConnectionStates3["VoiceConnected"] = "VOICE_CONNECTED";
      VoiceConnectionStates3["NoRoute"] = "NO_ROUTE";
      VoiceConnectionStates3["IceChecking"] = "ICE_CHECKING";
    })(VoiceConnectionStates2 || (exports2.VoiceConnectionStates = VoiceConnectionStates2 = {}));
    var RelationshipType2;
    (function(RelationshipType3) {
      RelationshipType3[RelationshipType3["None"] = 0] = "None";
      RelationshipType3[RelationshipType3["Friend"] = 1] = "Friend";
      RelationshipType3[RelationshipType3["Blocked"] = 2] = "Blocked";
      RelationshipType3[RelationshipType3["PendingIncoming"] = 3] = "PendingIncoming";
      RelationshipType3[RelationshipType3["PendingOutgoing"] = 4] = "PendingOutgoing";
      RelationshipType3[RelationshipType3["Implicit"] = 5] = "Implicit";
    })(RelationshipType2 || (exports2.RelationshipType = RelationshipType2 = {}));
    var RPCErrorCodes2;
    (function(RPCErrorCodes3) {
      RPCErrorCodes3[RPCErrorCodes3["UnknownError"] = 1e3] = "UnknownError";
      RPCErrorCodes3[RPCErrorCodes3["ServiceUnavailable"] = 1001] = "ServiceUnavailable";
      RPCErrorCodes3[RPCErrorCodes3["TransactionAborted"] = 1002] = "TransactionAborted";
      RPCErrorCodes3[RPCErrorCodes3["InvalidPayload"] = 4e3] = "InvalidPayload";
      RPCErrorCodes3[RPCErrorCodes3["InvalidCommand"] = 4002] = "InvalidCommand";
      RPCErrorCodes3[RPCErrorCodes3["InvalidGuild"] = 4003] = "InvalidGuild";
      RPCErrorCodes3[RPCErrorCodes3["InvalidEvent"] = 4004] = "InvalidEvent";
      RPCErrorCodes3[RPCErrorCodes3["InvalidChannel"] = 4005] = "InvalidChannel";
      RPCErrorCodes3[RPCErrorCodes3["InvalidPermissions"] = 4006] = "InvalidPermissions";
      RPCErrorCodes3[RPCErrorCodes3["InvalidClientId"] = 4007] = "InvalidClientId";
      RPCErrorCodes3[RPCErrorCodes3["InvalidOrigin"] = 4008] = "InvalidOrigin";
      RPCErrorCodes3[RPCErrorCodes3["InvalidToken"] = 4009] = "InvalidToken";
      RPCErrorCodes3[RPCErrorCodes3["InvalidUser"] = 4010] = "InvalidUser";
      RPCErrorCodes3[RPCErrorCodes3["InvalidInvite"] = 4011] = "InvalidInvite";
      RPCErrorCodes3[RPCErrorCodes3["InvalidActivityJoinRequest"] = 4012] = "InvalidActivityJoinRequest";
      RPCErrorCodes3[RPCErrorCodes3["InvalidEntitlement"] = 4013] = "InvalidEntitlement";
      RPCErrorCodes3[RPCErrorCodes3["InvalidGiftCode"] = 4014] = "InvalidGiftCode";
      RPCErrorCodes3[RPCErrorCodes3["OAuth2Error"] = 5e3] = "OAuth2Error";
      RPCErrorCodes3[RPCErrorCodes3["SelectChannelTimedOut"] = 5001] = "SelectChannelTimedOut";
      RPCErrorCodes3[RPCErrorCodes3["GetGuildTimedOut"] = 5002] = "GetGuildTimedOut";
      RPCErrorCodes3[RPCErrorCodes3["SelectVoiceForceRequired"] = 5003] = "SelectVoiceForceRequired";
      RPCErrorCodes3[RPCErrorCodes3["CaptureShortcutAlreadyListening"] = 5004] = "CaptureShortcutAlreadyListening";
      RPCErrorCodes3[RPCErrorCodes3["InvalidActivitySecret"] = 5005] = "InvalidActivitySecret";
      RPCErrorCodes3[RPCErrorCodes3["NoEligibleActivity"] = 5006] = "NoEligibleActivity";
      RPCErrorCodes3[RPCErrorCodes3["PurchaseCanceled"] = 5007] = "PurchaseCanceled";
      RPCErrorCodes3[RPCErrorCodes3["PurchaseError"] = 5008] = "PurchaseError";
      RPCErrorCodes3[RPCErrorCodes3["UnauthorizedForAchievement"] = 5009] = "UnauthorizedForAchievement";
      RPCErrorCodes3[RPCErrorCodes3["RateLimited"] = 5010] = "RateLimited";
    })(RPCErrorCodes2 || (exports2.RPCErrorCodes = RPCErrorCodes2 = {}));
    var RPCCloseEventCodes2;
    (function(RPCCloseEventCodes3) {
      RPCCloseEventCodes3[RPCCloseEventCodes3["CloseNormal"] = 1e3] = "CloseNormal";
      RPCCloseEventCodes3[RPCCloseEventCodes3["CloseUnsupported"] = 1003] = "CloseUnsupported";
      RPCCloseEventCodes3[RPCCloseEventCodes3["CloseAbnormal"] = 1006] = "CloseAbnormal";
      RPCCloseEventCodes3[RPCCloseEventCodes3["InvalidClientId"] = 4e3] = "InvalidClientId";
      RPCCloseEventCodes3[RPCCloseEventCodes3["InvalidOrigin"] = 4001] = "InvalidOrigin";
      RPCCloseEventCodes3[RPCCloseEventCodes3["RateLimited"] = 4002] = "RateLimited";
      RPCCloseEventCodes3[RPCCloseEventCodes3["TokenRevoked"] = 4003] = "TokenRevoked";
      RPCCloseEventCodes3[RPCCloseEventCodes3["InvalidVersion"] = 4004] = "InvalidVersion";
      RPCCloseEventCodes3[RPCCloseEventCodes3["InvalidEncoding"] = 4005] = "InvalidEncoding";
    })(RPCCloseEventCodes2 || (exports2.RPCCloseEventCodes = RPCCloseEventCodes2 = {}));
  }
});

// node_modules/discord-api-types/rpc/v10.js
var require_v104 = __commonJS({
  "node_modules/discord-api-types/rpc/v10.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p)) __createBinding(exports3, m, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.RPCEvents = exports2.RPCCommands = exports2.RPCVersion = void 0;
    __exportStar(require_common3(), exports2);
    exports2.RPCVersion = "1";
    var RPCCommands2;
    (function(RPCCommands3) {
      RPCCommands3["AcceptActivityInvite"] = "ACCEPT_ACTIVITY_INVITE";
      RPCCommands3["ActivityInviteUser"] = "ACTIVITY_INVITE_USER";
      RPCCommands3["Authenticate"] = "AUTHENTICATE";
      RPCCommands3["Authorize"] = "AUTHORIZE";
      RPCCommands3["BraintreePopupBridgeCallback"] = "BRAINTREE_POPUP_BRIDGE_CALLBACK";
      RPCCommands3["BrowserHandoff"] = "BROWSER_HANDOFF";
      RPCCommands3["CloseActivityJoinRequest"] = "CLOSE_ACTIVITY_JOIN_REQUEST";
      RPCCommands3["ConnectionsCallback"] = "CONNECTIONS_CALLBACK";
      RPCCommands3["CreateChannelInvite"] = "CREATE_CHANNEL_INVITE";
      RPCCommands3["DeepLink"] = "DEEP_LINK";
      RPCCommands3["Dispatch"] = "DISPATCH";
      RPCCommands3["GetApplicationTicket"] = "GET_APPLICATION_TICKET";
      RPCCommands3["GetChannel"] = "GET_CHANNEL";
      RPCCommands3["GetChannels"] = "GET_CHANNELS";
      RPCCommands3["GetEntitlementTicket"] = "GET_ENTITLEMENT_TICKET";
      RPCCommands3["GetEntitlements"] = "GET_ENTITLEMENTS";
      RPCCommands3["GetGuild"] = "GET_GUILD";
      RPCCommands3["GetGuilds"] = "GET_GUILDS";
      RPCCommands3["GetImage"] = "GET_IMAGE";
      RPCCommands3["GetNetworkingConfig"] = "GET_NETWORKING_CONFIG";
      RPCCommands3["GetRelationships"] = "GET_RELATIONSHIPS";
      RPCCommands3["GetSelectedVoiceChannel"] = "GET_SELECTED_VOICE_CHANNEL";
      RPCCommands3["GetSkus"] = "GET_SKUS";
      RPCCommands3["GetUser"] = "GET_USER";
      RPCCommands3["GetVoiceSettings"] = "GET_VOICE_SETTINGS";
      RPCCommands3["GiftCodeBrowser"] = "GIFT_CODE_BROWSER";
      RPCCommands3["GuildTemplateBrowser"] = "GUILD_TEMPLATE_BROWSER";
      RPCCommands3["InviteBrowser"] = "INVITE_BROWSER";
      RPCCommands3["NetworkingCreateToken"] = "NETWORKING_CREATE_TOKEN";
      RPCCommands3["NetworkingPeerMetrics"] = "NETWORKING_PEER_METRICS";
      RPCCommands3["NetworkingSystemMetrics"] = "NETWORKING_SYSTEM_METRICS";
      RPCCommands3["OpenOverlayActivityInvite"] = "OPEN_OVERLAY_ACTIVITY_INVITE";
      RPCCommands3["OpenOverlayGuildInvite"] = "OPEN_OVERLAY_GUILD_INVITE";
      RPCCommands3["OpenOverlayVoiceSettings"] = "OPEN_OVERLAY_VOICE_SETTINGS";
      RPCCommands3["Overlay"] = "OVERLAY";
      RPCCommands3["SelectTextChannel"] = "SELECT_TEXT_CHANNEL";
      RPCCommands3["SelectVoiceChannel"] = "SELECT_VOICE_CHANNEL";
      RPCCommands3["SendActivityJoinInvite"] = "SEND_ACTIVITY_JOIN_INVITE";
      RPCCommands3["SetActivity"] = "SET_ACTIVITY";
      RPCCommands3["SetCertifiedDevices"] = "SET_CERTIFIED_DEVICES";
      RPCCommands3["SetOverlayLocked"] = "SET_OVERLAY_LOCKED";
      RPCCommands3["SetUserVoiceSettings"] = "SET_USER_VOICE_SETTINGS";
      RPCCommands3["SetUserVoiceSettings2"] = "SET_USER_VOICE_SETTINGS_2";
      RPCCommands3["SetVoiceSettings"] = "SET_VOICE_SETTINGS";
      RPCCommands3["SetVoiceSettings2"] = "SET_VOICE_SETTINGS_2";
      RPCCommands3["StartPurchase"] = "START_PURCHASE";
      RPCCommands3["Subscribe"] = "SUBSCRIBE";
      RPCCommands3["Unsubscribe"] = "UNSUBSCRIBE";
      RPCCommands3["ValidateApplication"] = "VALIDATE_APPLICATION";
    })(RPCCommands2 || (exports2.RPCCommands = RPCCommands2 = {}));
    var RPCEvents2;
    (function(RPCEvents3) {
      RPCEvents3["ActivityInvite"] = "ACTIVITY_INVITE";
      RPCEvents3["ActivityJoin"] = "ACTIVITY_JOIN";
      RPCEvents3["ActivityJoinRequest"] = "ACTIVITY_JOIN_REQUEST";
      RPCEvents3["ActivitySpectate"] = "ACTIVITY_SPECTATE";
      RPCEvents3["ChannelCreate"] = "CHANNEL_CREATE";
      RPCEvents3["CurrentUserUpdate"] = "CURRENT_USER_UPDATE";
      RPCEvents3["EntitlementCreate"] = "ENTITLEMENT_CREATE";
      RPCEvents3["EntitlementDelete"] = "ENTITLEMENT_DELETE";
      RPCEvents3["Error"] = "ERROR";
      RPCEvents3["GameJoin"] = "GAME_JOIN";
      RPCEvents3["GameSpectate"] = "GAME_SPECTATE";
      RPCEvents3["GuildCreate"] = "GUILD_CREATE";
      RPCEvents3["GuildStatus"] = "GUILD_STATUS";
      RPCEvents3["MessageCreate"] = "MESSAGE_CREATE";
      RPCEvents3["MessageDelete"] = "MESSAGE_DELETE";
      RPCEvents3["MessageUpdate"] = "MESSAGE_UPDATE";
      RPCEvents3["NotificationCreate"] = "NOTIFICATION_CREATE";
      RPCEvents3["Overlay"] = "OVERLAY";
      RPCEvents3["OverlayUpdate"] = "OVERLAY_UPDATE";
      RPCEvents3["Ready"] = "READY";
      RPCEvents3["RelationshipUpdate"] = "RELATIONSHIP_UPDATE";
      RPCEvents3["SpeakingStart"] = "SPEAKING_START";
      RPCEvents3["SpeakingStop"] = "SPEAKING_STOP";
      RPCEvents3["VoiceChannelSelect"] = "VOICE_CHANNEL_SELECT";
      RPCEvents3["VoiceConnectionStatus"] = "VOICE_CONNECTION_STATUS";
      RPCEvents3["VoiceSettingsUpdate"] = "VOICE_SETTINGS_UPDATE";
      RPCEvents3["VoiceSettingsUpdate2"] = "VOICE_SETTINGS_UPDATE_2";
      RPCEvents3["VoiceStateCreate"] = "VOICE_STATE_CREATE";
      RPCEvents3["VoiceStateDelete"] = "VOICE_STATE_DELETE";
      RPCEvents3["VoiceStateUpdate"] = "VOICE_STATE_UPDATE";
    })(RPCEvents2 || (exports2.RPCEvents = RPCEvents2 = {}));
  }
});

// node_modules/discord-api-types/utils/v10.js
var require_v105 = __commonJS({
  "node_modules/discord-api-types/utils/v10.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.isDMInteraction = isDMInteraction;
    exports2.isGuildInteraction = isGuildInteraction;
    exports2.isApplicationCommandDMInteraction = isApplicationCommandDMInteraction;
    exports2.isApplicationCommandGuildInteraction = isApplicationCommandGuildInteraction;
    exports2.isMessageComponentDMInteraction = isMessageComponentDMInteraction;
    exports2.isMessageComponentGuildInteraction = isMessageComponentGuildInteraction;
    exports2.isLinkButton = isLinkButton;
    exports2.isInteractionButton = isInteractionButton;
    exports2.isModalSubmitInteraction = isModalSubmitInteraction;
    exports2.isMessageComponentInteraction = isMessageComponentInteraction;
    exports2.isMessageComponentButtonInteraction = isMessageComponentButtonInteraction;
    exports2.isMessageComponentSelectMenuInteraction = isMessageComponentSelectMenuInteraction;
    exports2.isChatInputApplicationCommandInteraction = isChatInputApplicationCommandInteraction;
    exports2.isContextMenuApplicationCommandInteraction = isContextMenuApplicationCommandInteraction;
    var index_1 = require_v102();
    function isDMInteraction(interaction) {
      return Reflect.has(interaction, "user");
    }
    function isGuildInteraction(interaction) {
      return Reflect.has(interaction, "guild_id");
    }
    function isApplicationCommandDMInteraction(interaction) {
      return isDMInteraction(interaction);
    }
    function isApplicationCommandGuildInteraction(interaction) {
      return isGuildInteraction(interaction);
    }
    function isMessageComponentDMInteraction(interaction) {
      return isDMInteraction(interaction);
    }
    function isMessageComponentGuildInteraction(interaction) {
      return isGuildInteraction(interaction);
    }
    function isLinkButton(component) {
      return component.style === index_1.ButtonStyle.Link;
    }
    function isInteractionButton(component) {
      return ![index_1.ButtonStyle.Link, index_1.ButtonStyle.Premium].includes(component.style);
    }
    function isModalSubmitInteraction(interaction) {
      return interaction.type === index_1.InteractionType.ModalSubmit;
    }
    function isMessageComponentInteraction(interaction) {
      return interaction.type === index_1.InteractionType.MessageComponent;
    }
    function isMessageComponentButtonInteraction(interaction) {
      return interaction.data.component_type === index_1.ComponentType.Button;
    }
    function isMessageComponentSelectMenuInteraction(interaction) {
      return [
        index_1.ComponentType.StringSelect,
        index_1.ComponentType.UserSelect,
        index_1.ComponentType.RoleSelect,
        index_1.ComponentType.MentionableSelect,
        index_1.ComponentType.ChannelSelect
      ].includes(interaction.data.component_type);
    }
    function isChatInputApplicationCommandInteraction(interaction) {
      return interaction.data.type === index_1.ApplicationCommandType.ChatInput;
    }
    function isContextMenuApplicationCommandInteraction(interaction) {
      return interaction.data.type === index_1.ApplicationCommandType.Message || interaction.data.type === index_1.ApplicationCommandType.User;
    }
  }
});

// node_modules/discord-api-types/v10.js
var require_v106 = __commonJS({
  "node_modules/discord-api-types/v10.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p)) __createBinding(exports3, m, p);
    };
    var __importStar = exports2 && exports2.__importStar || /* @__PURE__ */ (function() {
      var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o2) {
          var ar = [];
          for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
          return ar;
        };
        return ownKeys(o);
      };
      return function(mod2) {
        if (mod2 && mod2.__esModule) return mod2;
        var result = {};
        if (mod2 != null) {
          for (var k = ownKeys(mod2), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod2, k[i]);
        }
        __setModuleDefault(result, mod2);
        return result;
      };
    })();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Utils = void 0;
    __exportStar(require_v10(), exports2);
    __exportStar(require_globals(), exports2);
    __exportStar(require_v102(), exports2);
    __exportStar(require_v103(), exports2);
    __exportStar(require_v104(), exports2);
    __exportStar(require_internals(), exports2);
    exports2.Utils = __importStar(require_v105());
  }
});

// node_modules/discord-interactions/dist/util.js
var require_util = __commonJS({
  "node_modules/discord-interactions/dist/util.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.concatUint8Arrays = exports2.valueToUint8Array = exports2.subtleCrypto = void 0;
    function getSubtleCrypto() {
      if (typeof window !== "undefined" && window.crypto) {
        return window.crypto.subtle;
      }
      if (typeof globalThis !== "undefined" && globalThis.crypto) {
        return globalThis.crypto.subtle;
      }
      if (typeof crypto !== "undefined") {
        return crypto.subtle;
      }
      if (typeof require === "function") {
        const cryptoPackage = "node:crypto";
        const crypto3 = require(cryptoPackage);
        return crypto3.webcrypto.subtle;
      }
      throw new Error("No Web Crypto API implementation found");
    }
    exports2.subtleCrypto = getSubtleCrypto();
    function valueToUint8Array(value, format) {
      if (value == null) {
        return new Uint8Array();
      }
      if (typeof value === "string") {
        if (format === "hex") {
          const matches = value.match(/.{1,2}/g);
          if (matches == null) {
            throw new Error("Value is not a valid hex string");
          }
          const hexVal = matches.map((byte) => Number.parseInt(byte, 16));
          return new Uint8Array(hexVal);
        }
        return new TextEncoder().encode(value);
      }
      try {
        if (Buffer.isBuffer(value)) {
          return new Uint8Array(value);
        }
      } catch (_ex) {
      }
      if (value instanceof ArrayBuffer) {
        return new Uint8Array(value);
      }
      if (value instanceof Uint8Array) {
        return value;
      }
      throw new Error("Unrecognized value type, must be one of: string, Buffer, ArrayBuffer, Uint8Array");
    }
    exports2.valueToUint8Array = valueToUint8Array;
    function concatUint8Arrays(arr1, arr2) {
      const merged = new Uint8Array(arr1.length + arr2.length);
      merged.set(arr1);
      merged.set(arr2, arr1.length);
      return merged;
    }
    exports2.concatUint8Arrays = concatUint8Arrays;
  }
});

// node_modules/discord-interactions/dist/webhooks.js
var require_webhooks = __commonJS({
  "node_modules/discord-interactions/dist/webhooks.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.WebhookEventType = exports2.WebhookType = void 0;
    var WebhookType2;
    (function(WebhookType3) {
      WebhookType3[WebhookType3["PING"] = 0] = "PING";
      WebhookType3[WebhookType3["EVENT"] = 1] = "EVENT";
    })(WebhookType2 || (exports2.WebhookType = WebhookType2 = {}));
    var WebhookEventType;
    (function(WebhookEventType2) {
      WebhookEventType2["APPLICATION_AUTHORIZED"] = "APPLICATION_AUTHORIZED";
      WebhookEventType2["APPLICATION_DEAUTHORIZED"] = "APPLICATION_DEAUTHORIZED";
      WebhookEventType2["ENTITLEMENT_CREATE"] = "ENTITLEMENT_CREATE";
      WebhookEventType2["QUEST_USER_ENROLLMENT"] = "QUEST_USER_ENROLLMENT";
      WebhookEventType2["LOBBY_MESSAGE_CREATE"] = "LOBBY_MESSAGE_CREATE";
      WebhookEventType2["LOBBY_MESSAGE_UPDATE"] = "LOBBY_MESSAGE_UPDATE";
      WebhookEventType2["LOBBY_MESSAGE_DELETE"] = "LOBBY_MESSAGE_DELETE";
      WebhookEventType2["GAME_DIRECT_MESSAGE_CREATE"] = "GAME_DIRECT_MESSAGE_CREATE";
      WebhookEventType2["GAME_DIRECT_MESSAGE_UPDATE"] = "GAME_DIRECT_MESSAGE_UPDATE";
      WebhookEventType2["GAME_DIRECT_MESSAGE_DELETE"] = "GAME_DIRECT_MESSAGE_DELETE";
    })(WebhookEventType || (exports2.WebhookEventType = WebhookEventType = {}));
  }
});

// node_modules/discord-interactions/dist/components.js
var require_components = __commonJS({
  "node_modules/discord-interactions/dist/components.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SeparatorSpacingTypes = exports2.TextStyleTypes = exports2.ChannelTypes = exports2.ButtonStyleTypes = exports2.MessageComponentTypes = void 0;
    var MessageComponentTypes;
    (function(MessageComponentTypes2) {
      MessageComponentTypes2[MessageComponentTypes2["ACTION_ROW"] = 1] = "ACTION_ROW";
      MessageComponentTypes2[MessageComponentTypes2["BUTTON"] = 2] = "BUTTON";
      MessageComponentTypes2[MessageComponentTypes2["STRING_SELECT"] = 3] = "STRING_SELECT";
      MessageComponentTypes2[MessageComponentTypes2["INPUT_TEXT"] = 4] = "INPUT_TEXT";
      MessageComponentTypes2[MessageComponentTypes2["USER_SELECT"] = 5] = "USER_SELECT";
      MessageComponentTypes2[MessageComponentTypes2["ROLE_SELECT"] = 6] = "ROLE_SELECT";
      MessageComponentTypes2[MessageComponentTypes2["MENTIONABLE_SELECT"] = 7] = "MENTIONABLE_SELECT";
      MessageComponentTypes2[MessageComponentTypes2["CHANNEL_SELECT"] = 8] = "CHANNEL_SELECT";
      MessageComponentTypes2[MessageComponentTypes2["SECTION"] = 9] = "SECTION";
      MessageComponentTypes2[MessageComponentTypes2["TEXT_DISPLAY"] = 10] = "TEXT_DISPLAY";
      MessageComponentTypes2[MessageComponentTypes2["THUMBNAIL"] = 11] = "THUMBNAIL";
      MessageComponentTypes2[MessageComponentTypes2["MEDIA_GALLERY"] = 12] = "MEDIA_GALLERY";
      MessageComponentTypes2[MessageComponentTypes2["FILE"] = 13] = "FILE";
      MessageComponentTypes2[MessageComponentTypes2["SEPARATOR"] = 14] = "SEPARATOR";
      MessageComponentTypes2[MessageComponentTypes2["CONTAINER"] = 17] = "CONTAINER";
      MessageComponentTypes2[MessageComponentTypes2["LABEL"] = 18] = "LABEL";
    })(MessageComponentTypes || (exports2.MessageComponentTypes = MessageComponentTypes = {}));
    var ButtonStyleTypes;
    (function(ButtonStyleTypes2) {
      ButtonStyleTypes2[ButtonStyleTypes2["PRIMARY"] = 1] = "PRIMARY";
      ButtonStyleTypes2[ButtonStyleTypes2["SECONDARY"] = 2] = "SECONDARY";
      ButtonStyleTypes2[ButtonStyleTypes2["SUCCESS"] = 3] = "SUCCESS";
      ButtonStyleTypes2[ButtonStyleTypes2["DANGER"] = 4] = "DANGER";
      ButtonStyleTypes2[ButtonStyleTypes2["LINK"] = 5] = "LINK";
      ButtonStyleTypes2[ButtonStyleTypes2["PREMIUM"] = 6] = "PREMIUM";
    })(ButtonStyleTypes || (exports2.ButtonStyleTypes = ButtonStyleTypes = {}));
    var ChannelTypes;
    (function(ChannelTypes2) {
      ChannelTypes2[ChannelTypes2["GUILD_TEXT"] = 0] = "GUILD_TEXT";
      ChannelTypes2[ChannelTypes2["DM"] = 1] = "DM";
      ChannelTypes2[ChannelTypes2["GUILD_VOICE"] = 2] = "GUILD_VOICE";
      ChannelTypes2[ChannelTypes2["GROUP_DM"] = 3] = "GROUP_DM";
      ChannelTypes2[ChannelTypes2["GUILD_CATEGORY"] = 4] = "GUILD_CATEGORY";
      ChannelTypes2[ChannelTypes2["GUILD_ANNOUNCEMENT"] = 5] = "GUILD_ANNOUNCEMENT";
      ChannelTypes2[ChannelTypes2["GUILD_STORE"] = 6] = "GUILD_STORE";
      ChannelTypes2[ChannelTypes2["ANNOUNCEMENT_THREAD"] = 10] = "ANNOUNCEMENT_THREAD";
      ChannelTypes2[ChannelTypes2["PUBLIC_THREAD"] = 11] = "PUBLIC_THREAD";
      ChannelTypes2[ChannelTypes2["PRIVATE_THREAD"] = 12] = "PRIVATE_THREAD";
      ChannelTypes2[ChannelTypes2["GUILD_STAGE_VOICE"] = 13] = "GUILD_STAGE_VOICE";
      ChannelTypes2[ChannelTypes2["GUILD_DIRECTORY"] = 14] = "GUILD_DIRECTORY";
      ChannelTypes2[ChannelTypes2["GUILD_FORUM"] = 15] = "GUILD_FORUM";
      ChannelTypes2[ChannelTypes2["GUILD_MEDIA"] = 16] = "GUILD_MEDIA";
    })(ChannelTypes || (exports2.ChannelTypes = ChannelTypes = {}));
    var TextStyleTypes;
    (function(TextStyleTypes2) {
      TextStyleTypes2[TextStyleTypes2["SHORT"] = 1] = "SHORT";
      TextStyleTypes2[TextStyleTypes2["PARAGRAPH"] = 2] = "PARAGRAPH";
    })(TextStyleTypes || (exports2.TextStyleTypes = TextStyleTypes = {}));
    var SeparatorSpacingTypes;
    (function(SeparatorSpacingTypes2) {
      SeparatorSpacingTypes2[SeparatorSpacingTypes2["SMALL"] = 1] = "SMALL";
      SeparatorSpacingTypes2[SeparatorSpacingTypes2["LARGE"] = 2] = "LARGE";
    })(SeparatorSpacingTypes || (exports2.SeparatorSpacingTypes = SeparatorSpacingTypes = {}));
  }
});

// node_modules/discord-interactions/dist/index.js
var require_dist = __commonJS({
  "node_modules/discord-interactions/dist/index.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p)) __createBinding(exports3, m, p);
    };
    var __awaiter = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.verifyWebhookEventMiddleware = exports2.verifyKeyMiddleware = exports2.verifyKey = exports2.InteractionResponseFlags = exports2.InteractionResponseType = exports2.InteractionType = void 0;
    var util_1 = require_util();
    var webhooks_1 = require_webhooks();
    var InteractionType4;
    (function(InteractionType5) {
      InteractionType5[InteractionType5["PING"] = 1] = "PING";
      InteractionType5[InteractionType5["APPLICATION_COMMAND"] = 2] = "APPLICATION_COMMAND";
      InteractionType5[InteractionType5["MESSAGE_COMPONENT"] = 3] = "MESSAGE_COMPONENT";
      InteractionType5[InteractionType5["APPLICATION_COMMAND_AUTOCOMPLETE"] = 4] = "APPLICATION_COMMAND_AUTOCOMPLETE";
      InteractionType5[InteractionType5["MODAL_SUBMIT"] = 5] = "MODAL_SUBMIT";
    })(InteractionType4 || (exports2.InteractionType = InteractionType4 = {}));
    var InteractionResponseType2;
    (function(InteractionResponseType3) {
      InteractionResponseType3[InteractionResponseType3["PONG"] = 1] = "PONG";
      InteractionResponseType3[InteractionResponseType3["CHANNEL_MESSAGE_WITH_SOURCE"] = 4] = "CHANNEL_MESSAGE_WITH_SOURCE";
      InteractionResponseType3[InteractionResponseType3["DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE"] = 5] = "DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE";
      InteractionResponseType3[InteractionResponseType3["DEFERRED_UPDATE_MESSAGE"] = 6] = "DEFERRED_UPDATE_MESSAGE";
      InteractionResponseType3[InteractionResponseType3["UPDATE_MESSAGE"] = 7] = "UPDATE_MESSAGE";
      InteractionResponseType3[InteractionResponseType3["APPLICATION_COMMAND_AUTOCOMPLETE_RESULT"] = 8] = "APPLICATION_COMMAND_AUTOCOMPLETE_RESULT";
      InteractionResponseType3[InteractionResponseType3["MODAL"] = 9] = "MODAL";
      InteractionResponseType3[InteractionResponseType3["PREMIUM_REQUIRED"] = 10] = "PREMIUM_REQUIRED";
      InteractionResponseType3[InteractionResponseType3["LAUNCH_ACTIVITY"] = 12] = "LAUNCH_ACTIVITY";
    })(InteractionResponseType2 || (exports2.InteractionResponseType = InteractionResponseType2 = {}));
    var InteractionResponseFlags;
    (function(InteractionResponseFlags2) {
      InteractionResponseFlags2[InteractionResponseFlags2["EPHEMERAL"] = 64] = "EPHEMERAL";
      InteractionResponseFlags2[InteractionResponseFlags2["IS_COMPONENTS_V2"] = 32768] = "IS_COMPONENTS_V2";
    })(InteractionResponseFlags || (exports2.InteractionResponseFlags = InteractionResponseFlags = {}));
    function verifyKey2(rawBody, signature, timestamp, clientPublicKey) {
      return __awaiter(this, void 0, void 0, function* () {
        try {
          const timestampData = (0, util_1.valueToUint8Array)(timestamp);
          const bodyData = (0, util_1.valueToUint8Array)(rawBody);
          const message = (0, util_1.concatUint8Arrays)(timestampData, bodyData);
          const publicKey = typeof clientPublicKey === "string" ? yield util_1.subtleCrypto.importKey("raw", (0, util_1.valueToUint8Array)(clientPublicKey, "hex"), {
            name: "ed25519",
            namedCurve: "ed25519"
          }, false, ["verify"]) : clientPublicKey;
          const isValid = yield util_1.subtleCrypto.verify({
            name: "ed25519"
          }, publicKey, (0, util_1.valueToUint8Array)(signature, "hex"), message);
          return isValid;
        } catch (_ex) {
          return false;
        }
      });
    }
    exports2.verifyKey = verifyKey2;
    function verifyKeyMiddleware(clientPublicKey) {
      if (!clientPublicKey) {
        throw new Error("You must specify a Discord client public key");
      }
      return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        const timestamp = req.header("X-Signature-Timestamp") || "";
        const signature = req.header("X-Signature-Ed25519") || "";
        if (!timestamp || !signature) {
          res.statusCode = 401;
          res.end("[discord-interactions] Invalid signature");
          return;
        }
        function onBodyComplete(rawBody) {
          return __awaiter(this, void 0, void 0, function* () {
            const isValid = yield verifyKey2(rawBody, signature, timestamp, clientPublicKey);
            if (!isValid) {
              res.statusCode = 401;
              res.end("[discord-interactions] Invalid signature");
              return;
            }
            const body = JSON.parse(rawBody.toString("utf-8")) || {};
            if (body.type === InteractionType4.PING) {
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({
                type: InteractionResponseType2.PONG
              }));
              return;
            }
            req.body = body;
            next();
          });
        }
        if (req.body) {
          if (Buffer.isBuffer(req.body)) {
            yield onBodyComplete(req.body);
          } else if (typeof req.body === "string") {
            yield onBodyComplete(Buffer.from(req.body, "utf-8"));
          } else {
            console.warn("[discord-interactions]: req.body was tampered with, probably by some other middleware. We recommend disabling middleware for interaction routes so that req.body is a raw buffer.");
            yield onBodyComplete(Buffer.from(JSON.stringify(req.body), "utf-8"));
          }
        } else {
          const chunks = [];
          req.on("data", (chunk) => {
            chunks.push(chunk);
          });
          req.on("end", () => __awaiter(this, void 0, void 0, function* () {
            const rawBody = Buffer.concat(chunks);
            yield onBodyComplete(rawBody);
          }));
        }
      });
    }
    exports2.verifyKeyMiddleware = verifyKeyMiddleware;
    function verifyWebhookEventMiddleware(clientPublicKey) {
      if (!clientPublicKey) {
        throw new Error("You must specify a Discord client public key");
      }
      return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        const timestamp = req.header("X-Signature-Timestamp") || "";
        const signature = req.header("X-Signature-Ed25519") || "";
        if (!timestamp || !signature) {
          res.statusCode = 401;
          res.end("[discord-interactions] Invalid signature");
          return;
        }
        function onBodyComplete(rawBody) {
          return __awaiter(this, void 0, void 0, function* () {
            const isValid = yield verifyKey2(rawBody, signature, timestamp, clientPublicKey);
            if (!isValid) {
              res.statusCode = 401;
              res.end("[discord-interactions] Invalid signature");
              return;
            }
            const body = JSON.parse(rawBody.toString("utf-8")) || {};
            if (body.type === webhooks_1.WebhookType.PING) {
              res.statusCode = 204;
              res.end();
              return;
            }
            req.body = body;
            res.statusCode = 204;
            res.end();
            next();
          });
        }
        if (req.body) {
          if (Buffer.isBuffer(req.body)) {
            yield onBodyComplete(req.body);
          } else if (typeof req.body === "string") {
            yield onBodyComplete(Buffer.from(req.body, "utf-8"));
          } else {
            console.warn("[discord-interactions]: req.body was tampered with, probably by some other middleware. We recommend disabling middleware for webhook event routes so that req.body is a raw buffer.");
            yield onBodyComplete(Buffer.from(JSON.stringify(req.body), "utf-8"));
          }
        } else {
          const chunks = [];
          req.on("data", (chunk) => {
            chunks.push(chunk);
          });
          req.on("end", () => __awaiter(this, void 0, void 0, function* () {
            const rawBody = Buffer.concat(chunks);
            yield onBodyComplete(rawBody);
          }));
        }
      });
    }
    exports2.verifyWebhookEventMiddleware = verifyWebhookEventMiddleware;
    __exportStar(require_components(), exports2);
    __exportStar(require_webhooks(), exports2);
  }
});

// index.ts
var index_exports = {};
__export(index_exports, {
  default: () => handler
});
module.exports = __toCommonJS(index_exports);

// node_modules/discord-api-types/v10.mjs
var import_v10 = __toESM(require_v106(), 1);
var APIApplicationCommandPermissionsConstant = import_v10.default.APIApplicationCommandPermissionsConstant;
var APIVersion = import_v10.default.APIVersion;
var ActivityFlags = import_v10.default.ActivityFlags;
var ActivityLocationKind = import_v10.default.ActivityLocationKind;
var ActivityPlatform = import_v10.default.ActivityPlatform;
var ActivityType = import_v10.default.ActivityType;
var AllowedMentionsTypes = import_v10.default.AllowedMentionsTypes;
var ApplicationCommandOptionType = import_v10.default.ApplicationCommandOptionType;
var ApplicationCommandPermissionType = import_v10.default.ApplicationCommandPermissionType;
var ApplicationCommandType = import_v10.default.ApplicationCommandType;
var ApplicationFlags = import_v10.default.ApplicationFlags;
var ApplicationIntegrationType = import_v10.default.ApplicationIntegrationType;
var ApplicationRoleConnectionMetadataType = import_v10.default.ApplicationRoleConnectionMetadataType;
var ApplicationWebhookEventStatus = import_v10.default.ApplicationWebhookEventStatus;
var ApplicationWebhookEventType = import_v10.default.ApplicationWebhookEventType;
var ApplicationWebhookType = import_v10.default.ApplicationWebhookType;
var AttachmentFlags = import_v10.default.AttachmentFlags;
var AuditLogEvent = import_v10.default.AuditLogEvent;
var AuditLogOptionsType = import_v10.default.AuditLogOptionsType;
var AutoModerationActionType = import_v10.default.AutoModerationActionType;
var AutoModerationRuleEventType = import_v10.default.AutoModerationRuleEventType;
var AutoModerationRuleKeywordPresetType = import_v10.default.AutoModerationRuleKeywordPresetType;
var AutoModerationRuleTriggerType = import_v10.default.AutoModerationRuleTriggerType;
var BaseThemeType = import_v10.default.BaseThemeType;
var ButtonStyle = import_v10.default.ButtonStyle;
var CDNRoutes = import_v10.default.CDNRoutes;
var CannotSendMessagesToThisUserErrorCodes = import_v10.default.CannotSendMessagesToThisUserErrorCodes;
var ChannelFlags = import_v10.default.ChannelFlags;
var ChannelType = import_v10.default.ChannelType;
var ComponentType = import_v10.default.ComponentType;
var ConnectionService = import_v10.default.ConnectionService;
var ConnectionVisibility = import_v10.default.ConnectionVisibility;
var EmbedFlags = import_v10.default.EmbedFlags;
var EmbedMediaFlags = import_v10.default.EmbedMediaFlags;
var EmbedType = import_v10.default.EmbedType;
var EntitlementOwnerType = import_v10.default.EntitlementOwnerType;
var EntitlementType = import_v10.default.EntitlementType;
var EntryPointCommandHandlerType = import_v10.default.EntryPointCommandHandlerType;
var FormattingPatterns = import_v10.default.FormattingPatterns;
var ForumLayoutType = import_v10.default.ForumLayoutType;
var GatewayCloseCodes = import_v10.default.GatewayCloseCodes;
var GatewayDispatchEvents = import_v10.default.GatewayDispatchEvents;
var GatewayIntentBits = import_v10.default.GatewayIntentBits;
var GatewayOpcodes = import_v10.default.GatewayOpcodes;
var GatewayRequestChannelInfoField = import_v10.default.GatewayRequestChannelInfoField;
var GatewayVersion = import_v10.default.GatewayVersion;
var GuildDefaultMessageNotifications = import_v10.default.GuildDefaultMessageNotifications;
var GuildExplicitContentFilter = import_v10.default.GuildExplicitContentFilter;
var GuildFeature = import_v10.default.GuildFeature;
var GuildHubType = import_v10.default.GuildHubType;
var GuildMFALevel = import_v10.default.GuildMFALevel;
var GuildMemberFlags = import_v10.default.GuildMemberFlags;
var GuildNSFWLevel = import_v10.default.GuildNSFWLevel;
var GuildOnboardingMode = import_v10.default.GuildOnboardingMode;
var GuildOnboardingPromptType = import_v10.default.GuildOnboardingPromptType;
var GuildPremiumTier = import_v10.default.GuildPremiumTier;
var GuildScheduledEventEntityType = import_v10.default.GuildScheduledEventEntityType;
var GuildScheduledEventPrivacyLevel = import_v10.default.GuildScheduledEventPrivacyLevel;
var GuildScheduledEventRecurrenceRuleFrequency = import_v10.default.GuildScheduledEventRecurrenceRuleFrequency;
var GuildScheduledEventRecurrenceRuleMonth = import_v10.default.GuildScheduledEventRecurrenceRuleMonth;
var GuildScheduledEventRecurrenceRuleWeekday = import_v10.default.GuildScheduledEventRecurrenceRuleWeekday;
var GuildScheduledEventStatus = import_v10.default.GuildScheduledEventStatus;
var GuildSystemChannelFlags = import_v10.default.GuildSystemChannelFlags;
var GuildVerificationLevel = import_v10.default.GuildVerificationLevel;
var GuildWidgetStyle = import_v10.default.GuildWidgetStyle;
var ImageFormat = import_v10.default.ImageFormat;
var IntegrationExpireBehavior = import_v10.default.IntegrationExpireBehavior;
var InteractionContextType = import_v10.default.InteractionContextType;
var InteractionResponseType = import_v10.default.InteractionResponseType;
var InteractionType = import_v10.default.InteractionType;
var InviteFlags = import_v10.default.InviteFlags;
var InviteTargetType = import_v10.default.InviteTargetType;
var InviteTargetUsersJobStatus = import_v10.default.InviteTargetUsersJobStatus;
var InviteType = import_v10.default.InviteType;
var Locale = import_v10.default.Locale;
var MembershipScreeningFieldType = import_v10.default.MembershipScreeningFieldType;
var MessageActivityType = import_v10.default.MessageActivityType;
var MessageFlags = import_v10.default.MessageFlags;
var MessageReferenceType = import_v10.default.MessageReferenceType;
var MessageSearchAuthorType = import_v10.default.MessageSearchAuthorType;
var MessageSearchEmbedType = import_v10.default.MessageSearchEmbedType;
var MessageSearchHasType = import_v10.default.MessageSearchHasType;
var MessageSearchSortMode = import_v10.default.MessageSearchSortMode;
var MessageType = import_v10.default.MessageType;
var NameplatePalette = import_v10.default.NameplatePalette;
var OAuth2Routes = import_v10.default.OAuth2Routes;
var OAuth2Scopes = import_v10.default.OAuth2Scopes;
var OverwriteType = import_v10.default.OverwriteType;
var PermissionFlagsBits = import_v10.default.PermissionFlagsBits;
var PollLayoutType = import_v10.default.PollLayoutType;
var PresenceUpdateStatus = import_v10.default.PresenceUpdateStatus;
var RESTJSONErrorCodes = import_v10.default.RESTJSONErrorCodes;
var RPCCloseEventCodes = import_v10.default.RPCCloseEventCodes;
var RPCCommands = import_v10.default.RPCCommands;
var RPCDeviceType = import_v10.default.RPCDeviceType;
var RPCErrorCodes = import_v10.default.RPCErrorCodes;
var RPCEvents = import_v10.default.RPCEvents;
var RPCVersion = import_v10.default.RPCVersion;
var RPCVoiceSettingsModeType = import_v10.default.RPCVoiceSettingsModeType;
var RPCVoiceShortcutKeyComboKeyType = import_v10.default.RPCVoiceShortcutKeyComboKeyType;
var ReactionType = import_v10.default.ReactionType;
var RelationshipType = import_v10.default.RelationshipType;
var RoleFlags = import_v10.default.RoleFlags;
var RouteBases = import_v10.default.RouteBases;
var Routes = import_v10.default.Routes;
var SKUFlags = import_v10.default.SKUFlags;
var SKUType = import_v10.default.SKUType;
var SelectMenuDefaultValueType = import_v10.default.SelectMenuDefaultValueType;
var SeparatorSpacingSize = import_v10.default.SeparatorSpacingSize;
var SortOrderType = import_v10.default.SortOrderType;
var StageInstancePrivacyLevel = import_v10.default.StageInstancePrivacyLevel;
var StatusDisplayType = import_v10.default.StatusDisplayType;
var StickerFormatType = import_v10.default.StickerFormatType;
var StickerPackApplicationId = import_v10.default.StickerPackApplicationId;
var StickerType = import_v10.default.StickerType;
var SubscriptionStatus = import_v10.default.SubscriptionStatus;
var TeamMemberMembershipState = import_v10.default.TeamMemberMembershipState;
var TeamMemberRole = import_v10.default.TeamMemberRole;
var TextInputStyle = import_v10.default.TextInputStyle;
var ThreadAutoArchiveDuration = import_v10.default.ThreadAutoArchiveDuration;
var ThreadMemberFlags = import_v10.default.ThreadMemberFlags;
var UnfurledMediaItemFlags = import_v10.default.UnfurledMediaItemFlags;
var UnfurledMediaItemLoadingState = import_v10.default.UnfurledMediaItemLoadingState;
var UserFlags = import_v10.default.UserFlags;
var UserPremiumType = import_v10.default.UserPremiumType;
var Utils = import_v10.default.Utils;
var VideoQualityMode = import_v10.default.VideoQualityMode;
var VoiceChannelEffectSendAnimationType = import_v10.default.VoiceChannelEffectSendAnimationType;
var VoiceConnectionStates = import_v10.default.VoiceConnectionStates;
var WebhookType = import_v10.default.WebhookType;
var urlSafeCharacters = import_v10.default.urlSafeCharacters;

// index.ts
var import_discord_interactions2 = __toESM(require_dist(), 1);
var import_crypto = __toESM(require("crypto"), 1);

// commands/userinfo.ts
async function discordFetch(url, opts = {}) {
  const u = new URL(url);
  const mod2 = u.protocol === "https:" ? await import("https") : await import("http");
  return new Promise((resolve, reject) => {
    const req = mod2.request(u, {
      method: opts.method || "GET",
      headers: { "Content-Type": "application/json", ...opts.headers }
    }, (res) => {
      let body = "";
      res.on("data", (chunk) => body += chunk);
      res.on("end", () => {
        if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(body));
          } catch {
            resolve(body);
          }
        } else {
          let msg = `HTTP ${res.statusCode}`;
          try {
            const d = JSON.parse(body);
            msg = d.message || msg;
          } catch {
          }
          reject(new Error(msg));
        }
      });
    });
    req.on("error", reject);
    if (opts.body) {
      if (typeof opts.body === "string") req.write(opts.body);
      else req.write(JSON.stringify(opts.body));
    }
    req.end();
  });
}
function snowflakeToDate(id) {
  const timestamp = Number(BigInt(id) >> 22n) + 14200704e5;
  return new Date(timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
var userinfo_default = {
  data: {
    name: "userinfo",
    description: "Shows detailed information about a user",
    options: [
      {
        name: "user",
        description: "The user to inspect (defaults to you)",
        type: ApplicationCommandOptionType.User,
        required: false
      }
    ]
  },
  async execute(data) {
    const interaction = data.interaction;
    const targetId = interaction.data.options?.find((o) => o.name === "user")?.value || interaction.member.user.id;
    const headers = {
      Authorization: `Bot ${process.env.DISCORD_TOKEN}`
    };
    const user = await discordFetch(
      `https://discord.com/api/v10/users/${targetId}`,
      { headers }
    );
    const isAnimated = user.avatar?.startsWith("a_");
    const ext = isAnimated ? "gif" : "png";
    const avatarUrl = user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${ext}?size=1024` : `https://cdn.discordapp.com/embed/avatars/${Number(user.discriminator) % 5}.png`;
    const fields = [
      { name: "Username", value: `@${user.username}`, inline: true },
      { name: "Display Name", value: user.global_name || user.username, inline: true },
      { name: "ID", value: `\`${user.id}\``, inline: false },
      { name: "Bot", value: user.bot ? "Yes" : "No", inline: true },
      { name: "Joined Discord", value: snowflakeToDate(user.id), inline: true }
    ];
    if (user.accent_color) {
      fields.push({
        name: "Accent Color",
        value: `\`#${user.accent_color.toString(16).padStart(6, "0")}\``,
        inline: true
      });
    }
    const badges = [];
    const flags = user.public_flags ?? 0;
    if (flags & 1 << 0) badges.push("Discord Staff");
    if (flags & 1 << 1) badges.push("Partner");
    if (flags & 1 << 2) badges.push("HypeSquad Events");
    if (flags & 1 << 3) badges.push("Bug Hunter Lv1");
    if (flags & 1 << 6) badges.push("HypeSquad Bravery");
    if (flags & 1 << 7) badges.push("HypeSquad Brilliance");
    if (flags & 1 << 8) badges.push("HypeSquad Balance");
    if (flags & 1 << 9) badges.push("Early Supporter");
    if (flags & 1 << 10) badges.push("Team User");
    if (flags & 1 << 14) badges.push("Bug Hunter Lv2");
    if (flags & 1 << 16) badges.push("Verified Bot Dev");
    if (flags & 1 << 17) badges.push("Certified Moderator");
    if (flags & 1 << 18) badges.push("Bot HTTP Interactions");
    if (flags & 1 << 19) badges.push("Active Developer");
    if (badges.length) {
      fields.push({ name: "Badges", value: badges.join(", "), inline: false });
    }
    try {
      const member = await discordFetch(
        `https://discord.com/api/v10/guilds/${interaction.guild_id}/members/${targetId}`,
        { headers }
      );
      fields.splice(2, 0, {
        name: "Nickname",
        value: member.nick || "None",
        inline: true
      });
      const joinedAt = new Date(member.joined_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
      fields.push({ name: "Joined Server", value: joinedAt, inline: true });
      try {
        const allRoles = await discordFetch(
          `https://discord.com/api/v10/guilds/${interaction.guild_id}/roles`,
          { headers }
        );
        const memberRoleIds = member.roles;
        const memberRoles = allRoles.filter((r) => memberRoleIds.includes(r.id)).sort(
          (a, b) => b.position - a.position
        );
        fields.push({
          name: "Top Role",
          value: memberRoles[0]?.name || "None",
          inline: true
        });
        const roleMentions = memberRoles.slice(0, 10).map((r) => `<@&${r.id}>`).join(" ");
        const roleSummary = memberRoles.length > 10 ? `${roleMentions} *+${memberRoles.length - 10} more*` : roleMentions || "None";
        fields.push({ name: "Roles", value: roleSummary, inline: false });
      } catch {
        fields.push({
          name: "Roles",
          value: "*Could not fetch roles*",
          inline: false
        });
      }
    } catch (err) {
      const status = err.message?.match(/HTTP (\d+)/)?.[1] || "?";
      fields.push({ name: "Note", value: `*Could not fetch member data (HTTP ${status}) - make sure the bot has Server Members Intent enabled and try re-inviting with \`guilds.members.read\` scope*`, inline: false });
    }
    return {
      embeds: [
        {
          color: user.accent_color || 13213916,
          thumbnail: { url: avatarUrl },
          fields
        }
      ]
    };
  }
};

// commands/profile.ts
var profile_default = {
  data: {
    name: "profile",
    description: "Shows a user's profile picture",
    options: [
      {
        name: "user",
        description: "The user you want to see the profile of",
        type: ApplicationCommandOptionType.User,
        required: true
      }
    ]
  },
  async execute(data) {
    const interaction = data.interaction;
    const userId = interaction.data.options?.find(
      (o) => o.name === "user"
    )?.value;
    if (!userId) {
      return {
        content: "Bir kullan\u0131c\u0131 belirtmelisin.",
        flags: MessageFlags.Ephemeral
      };
    }
    const user = interaction.data.resolved?.users?.[userId];
    if (!user) {
      return {
        content: "Kullan\u0131c\u0131 bulunamad\u0131.",
        flags: MessageFlags.Ephemeral
      };
    }
    const isAnimated = user.avatar.startsWith("a_");
    const ext = isAnimated ? "gif" : "png";
    const avatarUrl = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${ext}?size=1024`;
    return {
      embeds: [
        {
          color: 13213916,
          fields: [
            { name: "Username", value: `@${user.username}`, inline: true },
            { name: "ID", value: `\`${user.id}\``, inline: true }
          ],
          image: { url: avatarUrl }
        }
      ]
    };
  }
};

// commands/ping.ts
var ping_default = {
  data: {
    name: "ping",
    // The name of the command
    description: "Check if the bot is online"
    // The description of the command
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(data) {
    return {
      content: "Pong from Vercel!"
      // The message content
    };
  }
};

// node_modules/@google/generative-ai/dist/index.mjs
var SchemaType;
(function(SchemaType2) {
  SchemaType2["STRING"] = "string";
  SchemaType2["NUMBER"] = "number";
  SchemaType2["INTEGER"] = "integer";
  SchemaType2["BOOLEAN"] = "boolean";
  SchemaType2["ARRAY"] = "array";
  SchemaType2["OBJECT"] = "object";
})(SchemaType || (SchemaType = {}));
var ExecutableCodeLanguage;
(function(ExecutableCodeLanguage2) {
  ExecutableCodeLanguage2["LANGUAGE_UNSPECIFIED"] = "language_unspecified";
  ExecutableCodeLanguage2["PYTHON"] = "python";
})(ExecutableCodeLanguage || (ExecutableCodeLanguage = {}));
var Outcome;
(function(Outcome2) {
  Outcome2["OUTCOME_UNSPECIFIED"] = "outcome_unspecified";
  Outcome2["OUTCOME_OK"] = "outcome_ok";
  Outcome2["OUTCOME_FAILED"] = "outcome_failed";
  Outcome2["OUTCOME_DEADLINE_EXCEEDED"] = "outcome_deadline_exceeded";
})(Outcome || (Outcome = {}));
var POSSIBLE_ROLES = ["user", "model", "function", "system"];
var HarmCategory;
(function(HarmCategory2) {
  HarmCategory2["HARM_CATEGORY_UNSPECIFIED"] = "HARM_CATEGORY_UNSPECIFIED";
  HarmCategory2["HARM_CATEGORY_HATE_SPEECH"] = "HARM_CATEGORY_HATE_SPEECH";
  HarmCategory2["HARM_CATEGORY_SEXUALLY_EXPLICIT"] = "HARM_CATEGORY_SEXUALLY_EXPLICIT";
  HarmCategory2["HARM_CATEGORY_HARASSMENT"] = "HARM_CATEGORY_HARASSMENT";
  HarmCategory2["HARM_CATEGORY_DANGEROUS_CONTENT"] = "HARM_CATEGORY_DANGEROUS_CONTENT";
  HarmCategory2["HARM_CATEGORY_CIVIC_INTEGRITY"] = "HARM_CATEGORY_CIVIC_INTEGRITY";
})(HarmCategory || (HarmCategory = {}));
var HarmBlockThreshold;
(function(HarmBlockThreshold2) {
  HarmBlockThreshold2["HARM_BLOCK_THRESHOLD_UNSPECIFIED"] = "HARM_BLOCK_THRESHOLD_UNSPECIFIED";
  HarmBlockThreshold2["BLOCK_LOW_AND_ABOVE"] = "BLOCK_LOW_AND_ABOVE";
  HarmBlockThreshold2["BLOCK_MEDIUM_AND_ABOVE"] = "BLOCK_MEDIUM_AND_ABOVE";
  HarmBlockThreshold2["BLOCK_ONLY_HIGH"] = "BLOCK_ONLY_HIGH";
  HarmBlockThreshold2["BLOCK_NONE"] = "BLOCK_NONE";
})(HarmBlockThreshold || (HarmBlockThreshold = {}));
var HarmProbability;
(function(HarmProbability2) {
  HarmProbability2["HARM_PROBABILITY_UNSPECIFIED"] = "HARM_PROBABILITY_UNSPECIFIED";
  HarmProbability2["NEGLIGIBLE"] = "NEGLIGIBLE";
  HarmProbability2["LOW"] = "LOW";
  HarmProbability2["MEDIUM"] = "MEDIUM";
  HarmProbability2["HIGH"] = "HIGH";
})(HarmProbability || (HarmProbability = {}));
var BlockReason;
(function(BlockReason2) {
  BlockReason2["BLOCKED_REASON_UNSPECIFIED"] = "BLOCKED_REASON_UNSPECIFIED";
  BlockReason2["SAFETY"] = "SAFETY";
  BlockReason2["OTHER"] = "OTHER";
})(BlockReason || (BlockReason = {}));
var FinishReason;
(function(FinishReason2) {
  FinishReason2["FINISH_REASON_UNSPECIFIED"] = "FINISH_REASON_UNSPECIFIED";
  FinishReason2["STOP"] = "STOP";
  FinishReason2["MAX_TOKENS"] = "MAX_TOKENS";
  FinishReason2["SAFETY"] = "SAFETY";
  FinishReason2["RECITATION"] = "RECITATION";
  FinishReason2["LANGUAGE"] = "LANGUAGE";
  FinishReason2["BLOCKLIST"] = "BLOCKLIST";
  FinishReason2["PROHIBITED_CONTENT"] = "PROHIBITED_CONTENT";
  FinishReason2["SPII"] = "SPII";
  FinishReason2["MALFORMED_FUNCTION_CALL"] = "MALFORMED_FUNCTION_CALL";
  FinishReason2["OTHER"] = "OTHER";
})(FinishReason || (FinishReason = {}));
var TaskType;
(function(TaskType2) {
  TaskType2["TASK_TYPE_UNSPECIFIED"] = "TASK_TYPE_UNSPECIFIED";
  TaskType2["RETRIEVAL_QUERY"] = "RETRIEVAL_QUERY";
  TaskType2["RETRIEVAL_DOCUMENT"] = "RETRIEVAL_DOCUMENT";
  TaskType2["SEMANTIC_SIMILARITY"] = "SEMANTIC_SIMILARITY";
  TaskType2["CLASSIFICATION"] = "CLASSIFICATION";
  TaskType2["CLUSTERING"] = "CLUSTERING";
})(TaskType || (TaskType = {}));
var FunctionCallingMode;
(function(FunctionCallingMode2) {
  FunctionCallingMode2["MODE_UNSPECIFIED"] = "MODE_UNSPECIFIED";
  FunctionCallingMode2["AUTO"] = "AUTO";
  FunctionCallingMode2["ANY"] = "ANY";
  FunctionCallingMode2["NONE"] = "NONE";
})(FunctionCallingMode || (FunctionCallingMode = {}));
var DynamicRetrievalMode;
(function(DynamicRetrievalMode2) {
  DynamicRetrievalMode2["MODE_UNSPECIFIED"] = "MODE_UNSPECIFIED";
  DynamicRetrievalMode2["MODE_DYNAMIC"] = "MODE_DYNAMIC";
})(DynamicRetrievalMode || (DynamicRetrievalMode = {}));
var GoogleGenerativeAIError = class extends Error {
  constructor(message) {
    super(`[GoogleGenerativeAI Error]: ${message}`);
  }
};
var GoogleGenerativeAIResponseError = class extends GoogleGenerativeAIError {
  constructor(message, response) {
    super(message);
    this.response = response;
  }
};
var GoogleGenerativeAIFetchError = class extends GoogleGenerativeAIError {
  constructor(message, status, statusText, errorDetails) {
    super(message);
    this.status = status;
    this.statusText = statusText;
    this.errorDetails = errorDetails;
  }
};
var GoogleGenerativeAIRequestInputError = class extends GoogleGenerativeAIError {
};
var GoogleGenerativeAIAbortError = class extends GoogleGenerativeAIError {
};
var DEFAULT_BASE_URL = "https://generativelanguage.googleapis.com";
var DEFAULT_API_VERSION = "v1beta";
var PACKAGE_VERSION = "0.24.1";
var PACKAGE_LOG_HEADER = "genai-js";
var Task;
(function(Task2) {
  Task2["GENERATE_CONTENT"] = "generateContent";
  Task2["STREAM_GENERATE_CONTENT"] = "streamGenerateContent";
  Task2["COUNT_TOKENS"] = "countTokens";
  Task2["EMBED_CONTENT"] = "embedContent";
  Task2["BATCH_EMBED_CONTENTS"] = "batchEmbedContents";
})(Task || (Task = {}));
var RequestUrl = class {
  constructor(model, task, apiKey, stream, requestOptions) {
    this.model = model;
    this.task = task;
    this.apiKey = apiKey;
    this.stream = stream;
    this.requestOptions = requestOptions;
  }
  toString() {
    var _a, _b;
    const apiVersion = ((_a = this.requestOptions) === null || _a === void 0 ? void 0 : _a.apiVersion) || DEFAULT_API_VERSION;
    const baseUrl = ((_b = this.requestOptions) === null || _b === void 0 ? void 0 : _b.baseUrl) || DEFAULT_BASE_URL;
    let url = `${baseUrl}/${apiVersion}/${this.model}:${this.task}`;
    if (this.stream) {
      url += "?alt=sse";
    }
    return url;
  }
};
function getClientHeaders(requestOptions) {
  const clientHeaders = [];
  if (requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.apiClient) {
    clientHeaders.push(requestOptions.apiClient);
  }
  clientHeaders.push(`${PACKAGE_LOG_HEADER}/${PACKAGE_VERSION}`);
  return clientHeaders.join(" ");
}
async function getHeaders(url) {
  var _a;
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("x-goog-api-client", getClientHeaders(url.requestOptions));
  headers.append("x-goog-api-key", url.apiKey);
  let customHeaders = (_a = url.requestOptions) === null || _a === void 0 ? void 0 : _a.customHeaders;
  if (customHeaders) {
    if (!(customHeaders instanceof Headers)) {
      try {
        customHeaders = new Headers(customHeaders);
      } catch (e) {
        throw new GoogleGenerativeAIRequestInputError(`unable to convert customHeaders value ${JSON.stringify(customHeaders)} to Headers: ${e.message}`);
      }
    }
    for (const [headerName, headerValue] of customHeaders.entries()) {
      if (headerName === "x-goog-api-key") {
        throw new GoogleGenerativeAIRequestInputError(`Cannot set reserved header name ${headerName}`);
      } else if (headerName === "x-goog-api-client") {
        throw new GoogleGenerativeAIRequestInputError(`Header name ${headerName} can only be set using the apiClient field`);
      }
      headers.append(headerName, headerValue);
    }
  }
  return headers;
}
async function constructModelRequest(model, task, apiKey, stream, body, requestOptions) {
  const url = new RequestUrl(model, task, apiKey, stream, requestOptions);
  return {
    url: url.toString(),
    fetchOptions: Object.assign(Object.assign({}, buildFetchOptions(requestOptions)), { method: "POST", headers: await getHeaders(url), body })
  };
}
async function makeModelRequest(model, task, apiKey, stream, body, requestOptions = {}, fetchFn = fetch) {
  const { url, fetchOptions } = await constructModelRequest(model, task, apiKey, stream, body, requestOptions);
  return makeRequest(url, fetchOptions, fetchFn);
}
async function makeRequest(url, fetchOptions, fetchFn = fetch) {
  let response;
  try {
    response = await fetchFn(url, fetchOptions);
  } catch (e) {
    handleResponseError(e, url);
  }
  if (!response.ok) {
    await handleResponseNotOk(response, url);
  }
  return response;
}
function handleResponseError(e, url) {
  let err = e;
  if (err.name === "AbortError") {
    err = new GoogleGenerativeAIAbortError(`Request aborted when fetching ${url.toString()}: ${e.message}`);
    err.stack = e.stack;
  } else if (!(e instanceof GoogleGenerativeAIFetchError || e instanceof GoogleGenerativeAIRequestInputError)) {
    err = new GoogleGenerativeAIError(`Error fetching from ${url.toString()}: ${e.message}`);
    err.stack = e.stack;
  }
  throw err;
}
async function handleResponseNotOk(response, url) {
  let message = "";
  let errorDetails;
  try {
    const json = await response.json();
    message = json.error.message;
    if (json.error.details) {
      message += ` ${JSON.stringify(json.error.details)}`;
      errorDetails = json.error.details;
    }
  } catch (e) {
  }
  throw new GoogleGenerativeAIFetchError(`Error fetching from ${url.toString()}: [${response.status} ${response.statusText}] ${message}`, response.status, response.statusText, errorDetails);
}
function buildFetchOptions(requestOptions) {
  const fetchOptions = {};
  if ((requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.signal) !== void 0 || (requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeout) >= 0) {
    const controller = new AbortController();
    if ((requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeout) >= 0) {
      setTimeout(() => controller.abort(), requestOptions.timeout);
    }
    if (requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.signal) {
      requestOptions.signal.addEventListener("abort", () => {
        controller.abort();
      });
    }
    fetchOptions.signal = controller.signal;
  }
  return fetchOptions;
}
function addHelpers(response) {
  response.text = () => {
    if (response.candidates && response.candidates.length > 0) {
      if (response.candidates.length > 1) {
        console.warn(`This response had ${response.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`);
      }
      if (hadBadFinishReason(response.candidates[0])) {
        throw new GoogleGenerativeAIResponseError(`${formatBlockErrorMessage(response)}`, response);
      }
      return getText(response);
    } else if (response.promptFeedback) {
      throw new GoogleGenerativeAIResponseError(`Text not available. ${formatBlockErrorMessage(response)}`, response);
    }
    return "";
  };
  response.functionCall = () => {
    if (response.candidates && response.candidates.length > 0) {
      if (response.candidates.length > 1) {
        console.warn(`This response had ${response.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`);
      }
      if (hadBadFinishReason(response.candidates[0])) {
        throw new GoogleGenerativeAIResponseError(`${formatBlockErrorMessage(response)}`, response);
      }
      console.warn(`response.functionCall() is deprecated. Use response.functionCalls() instead.`);
      return getFunctionCalls(response)[0];
    } else if (response.promptFeedback) {
      throw new GoogleGenerativeAIResponseError(`Function call not available. ${formatBlockErrorMessage(response)}`, response);
    }
    return void 0;
  };
  response.functionCalls = () => {
    if (response.candidates && response.candidates.length > 0) {
      if (response.candidates.length > 1) {
        console.warn(`This response had ${response.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`);
      }
      if (hadBadFinishReason(response.candidates[0])) {
        throw new GoogleGenerativeAIResponseError(`${formatBlockErrorMessage(response)}`, response);
      }
      return getFunctionCalls(response);
    } else if (response.promptFeedback) {
      throw new GoogleGenerativeAIResponseError(`Function call not available. ${formatBlockErrorMessage(response)}`, response);
    }
    return void 0;
  };
  return response;
}
function getText(response) {
  var _a, _b, _c, _d;
  const textStrings = [];
  if ((_b = (_a = response.candidates) === null || _a === void 0 ? void 0 : _a[0].content) === null || _b === void 0 ? void 0 : _b.parts) {
    for (const part of (_d = (_c = response.candidates) === null || _c === void 0 ? void 0 : _c[0].content) === null || _d === void 0 ? void 0 : _d.parts) {
      if (part.text) {
        textStrings.push(part.text);
      }
      if (part.executableCode) {
        textStrings.push("\n```" + part.executableCode.language + "\n" + part.executableCode.code + "\n```\n");
      }
      if (part.codeExecutionResult) {
        textStrings.push("\n```\n" + part.codeExecutionResult.output + "\n```\n");
      }
    }
  }
  if (textStrings.length > 0) {
    return textStrings.join("");
  } else {
    return "";
  }
}
function getFunctionCalls(response) {
  var _a, _b, _c, _d;
  const functionCalls = [];
  if ((_b = (_a = response.candidates) === null || _a === void 0 ? void 0 : _a[0].content) === null || _b === void 0 ? void 0 : _b.parts) {
    for (const part of (_d = (_c = response.candidates) === null || _c === void 0 ? void 0 : _c[0].content) === null || _d === void 0 ? void 0 : _d.parts) {
      if (part.functionCall) {
        functionCalls.push(part.functionCall);
      }
    }
  }
  if (functionCalls.length > 0) {
    return functionCalls;
  } else {
    return void 0;
  }
}
var badFinishReasons = [
  FinishReason.RECITATION,
  FinishReason.SAFETY,
  FinishReason.LANGUAGE
];
function hadBadFinishReason(candidate) {
  return !!candidate.finishReason && badFinishReasons.includes(candidate.finishReason);
}
function formatBlockErrorMessage(response) {
  var _a, _b, _c;
  let message = "";
  if ((!response.candidates || response.candidates.length === 0) && response.promptFeedback) {
    message += "Response was blocked";
    if ((_a = response.promptFeedback) === null || _a === void 0 ? void 0 : _a.blockReason) {
      message += ` due to ${response.promptFeedback.blockReason}`;
    }
    if ((_b = response.promptFeedback) === null || _b === void 0 ? void 0 : _b.blockReasonMessage) {
      message += `: ${response.promptFeedback.blockReasonMessage}`;
    }
  } else if ((_c = response.candidates) === null || _c === void 0 ? void 0 : _c[0]) {
    const firstCandidate = response.candidates[0];
    if (hadBadFinishReason(firstCandidate)) {
      message += `Candidate was blocked due to ${firstCandidate.finishReason}`;
      if (firstCandidate.finishMessage) {
        message += `: ${firstCandidate.finishMessage}`;
      }
    }
  }
  return message;
}
function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i;
  function verb(n) {
    if (g[n]) i[n] = function(v) {
      return new Promise(function(a, b) {
        q.push([n, v, a, b]) > 1 || resume(n, v);
      });
    };
  }
  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }
  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f, v) {
    if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
  }
}
var responseLineRE = /^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;
function processStream(response) {
  const inputStream = response.body.pipeThrough(new TextDecoderStream("utf8", { fatal: true }));
  const responseStream = getResponseStream(inputStream);
  const [stream1, stream2] = responseStream.tee();
  return {
    stream: generateResponseSequence(stream1),
    response: getResponsePromise(stream2)
  };
}
async function getResponsePromise(stream) {
  const allResponses = [];
  const reader = stream.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      return addHelpers(aggregateResponses(allResponses));
    }
    allResponses.push(value);
  }
}
function generateResponseSequence(stream) {
  return __asyncGenerator(this, arguments, function* generateResponseSequence_1() {
    const reader = stream.getReader();
    while (true) {
      const { value, done } = yield __await(reader.read());
      if (done) {
        break;
      }
      yield yield __await(addHelpers(value));
    }
  });
}
function getResponseStream(inputStream) {
  const reader = inputStream.getReader();
  const stream = new ReadableStream({
    start(controller) {
      let currentText = "";
      return pump();
      function pump() {
        return reader.read().then(({ value, done }) => {
          if (done) {
            if (currentText.trim()) {
              controller.error(new GoogleGenerativeAIError("Failed to parse stream"));
              return;
            }
            controller.close();
            return;
          }
          currentText += value;
          let match = currentText.match(responseLineRE);
          let parsedResponse;
          while (match) {
            try {
              parsedResponse = JSON.parse(match[1]);
            } catch (e) {
              controller.error(new GoogleGenerativeAIError(`Error parsing JSON response: "${match[1]}"`));
              return;
            }
            controller.enqueue(parsedResponse);
            currentText = currentText.substring(match[0].length);
            match = currentText.match(responseLineRE);
          }
          return pump();
        }).catch((e) => {
          let err = e;
          err.stack = e.stack;
          if (err.name === "AbortError") {
            err = new GoogleGenerativeAIAbortError("Request aborted when reading from the stream");
          } else {
            err = new GoogleGenerativeAIError("Error reading from the stream");
          }
          throw err;
        });
      }
    }
  });
  return stream;
}
function aggregateResponses(responses) {
  const lastResponse = responses[responses.length - 1];
  const aggregatedResponse = {
    promptFeedback: lastResponse === null || lastResponse === void 0 ? void 0 : lastResponse.promptFeedback
  };
  for (const response of responses) {
    if (response.candidates) {
      let candidateIndex = 0;
      for (const candidate of response.candidates) {
        if (!aggregatedResponse.candidates) {
          aggregatedResponse.candidates = [];
        }
        if (!aggregatedResponse.candidates[candidateIndex]) {
          aggregatedResponse.candidates[candidateIndex] = {
            index: candidateIndex
          };
        }
        aggregatedResponse.candidates[candidateIndex].citationMetadata = candidate.citationMetadata;
        aggregatedResponse.candidates[candidateIndex].groundingMetadata = candidate.groundingMetadata;
        aggregatedResponse.candidates[candidateIndex].finishReason = candidate.finishReason;
        aggregatedResponse.candidates[candidateIndex].finishMessage = candidate.finishMessage;
        aggregatedResponse.candidates[candidateIndex].safetyRatings = candidate.safetyRatings;
        if (candidate.content && candidate.content.parts) {
          if (!aggregatedResponse.candidates[candidateIndex].content) {
            aggregatedResponse.candidates[candidateIndex].content = {
              role: candidate.content.role || "user",
              parts: []
            };
          }
          const newPart = {};
          for (const part of candidate.content.parts) {
            if (part.text) {
              newPart.text = part.text;
            }
            if (part.functionCall) {
              newPart.functionCall = part.functionCall;
            }
            if (part.executableCode) {
              newPart.executableCode = part.executableCode;
            }
            if (part.codeExecutionResult) {
              newPart.codeExecutionResult = part.codeExecutionResult;
            }
            if (Object.keys(newPart).length === 0) {
              newPart.text = "";
            }
            aggregatedResponse.candidates[candidateIndex].content.parts.push(newPart);
          }
        }
      }
      candidateIndex++;
    }
    if (response.usageMetadata) {
      aggregatedResponse.usageMetadata = response.usageMetadata;
    }
  }
  return aggregatedResponse;
}
async function generateContentStream(apiKey, model, params, requestOptions) {
  const response = await makeModelRequest(
    model,
    Task.STREAM_GENERATE_CONTENT,
    apiKey,
    /* stream */
    true,
    JSON.stringify(params),
    requestOptions
  );
  return processStream(response);
}
async function generateContent(apiKey, model, params, requestOptions) {
  const response = await makeModelRequest(
    model,
    Task.GENERATE_CONTENT,
    apiKey,
    /* stream */
    false,
    JSON.stringify(params),
    requestOptions
  );
  const responseJson = await response.json();
  const enhancedResponse = addHelpers(responseJson);
  return {
    response: enhancedResponse
  };
}
function formatSystemInstruction(input) {
  if (input == null) {
    return void 0;
  } else if (typeof input === "string") {
    return { role: "system", parts: [{ text: input }] };
  } else if (input.text) {
    return { role: "system", parts: [input] };
  } else if (input.parts) {
    if (!input.role) {
      return { role: "system", parts: input.parts };
    } else {
      return input;
    }
  }
}
function formatNewContent(request) {
  let newParts = [];
  if (typeof request === "string") {
    newParts = [{ text: request }];
  } else {
    for (const partOrString of request) {
      if (typeof partOrString === "string") {
        newParts.push({ text: partOrString });
      } else {
        newParts.push(partOrString);
      }
    }
  }
  return assignRoleToPartsAndValidateSendMessageRequest(newParts);
}
function assignRoleToPartsAndValidateSendMessageRequest(parts) {
  const userContent = { role: "user", parts: [] };
  const functionContent = { role: "function", parts: [] };
  let hasUserContent = false;
  let hasFunctionContent = false;
  for (const part of parts) {
    if ("functionResponse" in part) {
      functionContent.parts.push(part);
      hasFunctionContent = true;
    } else {
      userContent.parts.push(part);
      hasUserContent = true;
    }
  }
  if (hasUserContent && hasFunctionContent) {
    throw new GoogleGenerativeAIError("Within a single message, FunctionResponse cannot be mixed with other type of part in the request for sending chat message.");
  }
  if (!hasUserContent && !hasFunctionContent) {
    throw new GoogleGenerativeAIError("No content is provided for sending chat message.");
  }
  if (hasUserContent) {
    return userContent;
  }
  return functionContent;
}
function formatCountTokensInput(params, modelParams) {
  var _a;
  let formattedGenerateContentRequest = {
    model: modelParams === null || modelParams === void 0 ? void 0 : modelParams.model,
    generationConfig: modelParams === null || modelParams === void 0 ? void 0 : modelParams.generationConfig,
    safetySettings: modelParams === null || modelParams === void 0 ? void 0 : modelParams.safetySettings,
    tools: modelParams === null || modelParams === void 0 ? void 0 : modelParams.tools,
    toolConfig: modelParams === null || modelParams === void 0 ? void 0 : modelParams.toolConfig,
    systemInstruction: modelParams === null || modelParams === void 0 ? void 0 : modelParams.systemInstruction,
    cachedContent: (_a = modelParams === null || modelParams === void 0 ? void 0 : modelParams.cachedContent) === null || _a === void 0 ? void 0 : _a.name,
    contents: []
  };
  const containsGenerateContentRequest = params.generateContentRequest != null;
  if (params.contents) {
    if (containsGenerateContentRequest) {
      throw new GoogleGenerativeAIRequestInputError("CountTokensRequest must have one of contents or generateContentRequest, not both.");
    }
    formattedGenerateContentRequest.contents = params.contents;
  } else if (containsGenerateContentRequest) {
    formattedGenerateContentRequest = Object.assign(Object.assign({}, formattedGenerateContentRequest), params.generateContentRequest);
  } else {
    const content = formatNewContent(params);
    formattedGenerateContentRequest.contents = [content];
  }
  return { generateContentRequest: formattedGenerateContentRequest };
}
function formatGenerateContentInput(params) {
  let formattedRequest;
  if (params.contents) {
    formattedRequest = params;
  } else {
    const content = formatNewContent(params);
    formattedRequest = { contents: [content] };
  }
  if (params.systemInstruction) {
    formattedRequest.systemInstruction = formatSystemInstruction(params.systemInstruction);
  }
  return formattedRequest;
}
function formatEmbedContentInput(params) {
  if (typeof params === "string" || Array.isArray(params)) {
    const content = formatNewContent(params);
    return { content };
  }
  return params;
}
var VALID_PART_FIELDS = [
  "text",
  "inlineData",
  "functionCall",
  "functionResponse",
  "executableCode",
  "codeExecutionResult"
];
var VALID_PARTS_PER_ROLE = {
  user: ["text", "inlineData"],
  function: ["functionResponse"],
  model: ["text", "functionCall", "executableCode", "codeExecutionResult"],
  // System instructions shouldn't be in history anyway.
  system: ["text"]
};
function validateChatHistory(history) {
  let prevContent = false;
  for (const currContent of history) {
    const { role, parts } = currContent;
    if (!prevContent && role !== "user") {
      throw new GoogleGenerativeAIError(`First content should be with role 'user', got ${role}`);
    }
    if (!POSSIBLE_ROLES.includes(role)) {
      throw new GoogleGenerativeAIError(`Each item should include role field. Got ${role} but valid roles are: ${JSON.stringify(POSSIBLE_ROLES)}`);
    }
    if (!Array.isArray(parts)) {
      throw new GoogleGenerativeAIError("Content should have 'parts' property with an array of Parts");
    }
    if (parts.length === 0) {
      throw new GoogleGenerativeAIError("Each Content should have at least one part");
    }
    const countFields = {
      text: 0,
      inlineData: 0,
      functionCall: 0,
      functionResponse: 0,
      fileData: 0,
      executableCode: 0,
      codeExecutionResult: 0
    };
    for (const part of parts) {
      for (const key of VALID_PART_FIELDS) {
        if (key in part) {
          countFields[key] += 1;
        }
      }
    }
    const validParts = VALID_PARTS_PER_ROLE[role];
    for (const key of VALID_PART_FIELDS) {
      if (!validParts.includes(key) && countFields[key] > 0) {
        throw new GoogleGenerativeAIError(`Content with role '${role}' can't contain '${key}' part`);
      }
    }
    prevContent = true;
  }
}
function isValidResponse(response) {
  var _a;
  if (response.candidates === void 0 || response.candidates.length === 0) {
    return false;
  }
  const content = (_a = response.candidates[0]) === null || _a === void 0 ? void 0 : _a.content;
  if (content === void 0) {
    return false;
  }
  if (content.parts === void 0 || content.parts.length === 0) {
    return false;
  }
  for (const part of content.parts) {
    if (part === void 0 || Object.keys(part).length === 0) {
      return false;
    }
    if (part.text !== void 0 && part.text === "") {
      return false;
    }
  }
  return true;
}
var SILENT_ERROR = "SILENT_ERROR";
var ChatSession = class {
  constructor(apiKey, model, params, _requestOptions = {}) {
    this.model = model;
    this.params = params;
    this._requestOptions = _requestOptions;
    this._history = [];
    this._sendPromise = Promise.resolve();
    this._apiKey = apiKey;
    if (params === null || params === void 0 ? void 0 : params.history) {
      validateChatHistory(params.history);
      this._history = params.history;
    }
  }
  /**
   * Gets the chat history so far. Blocked prompts are not added to history.
   * Blocked candidates are not added to history, nor are the prompts that
   * generated them.
   */
  async getHistory() {
    await this._sendPromise;
    return this._history;
  }
  /**
   * Sends a chat message and receives a non-streaming
   * {@link GenerateContentResult}.
   *
   * Fields set in the optional {@link SingleRequestOptions} parameter will
   * take precedence over the {@link RequestOptions} values provided to
   * {@link GoogleGenerativeAI.getGenerativeModel }.
   */
  async sendMessage(request, requestOptions = {}) {
    var _a, _b, _c, _d, _e, _f;
    await this._sendPromise;
    const newContent = formatNewContent(request);
    const generateContentRequest = {
      safetySettings: (_a = this.params) === null || _a === void 0 ? void 0 : _a.safetySettings,
      generationConfig: (_b = this.params) === null || _b === void 0 ? void 0 : _b.generationConfig,
      tools: (_c = this.params) === null || _c === void 0 ? void 0 : _c.tools,
      toolConfig: (_d = this.params) === null || _d === void 0 ? void 0 : _d.toolConfig,
      systemInstruction: (_e = this.params) === null || _e === void 0 ? void 0 : _e.systemInstruction,
      cachedContent: (_f = this.params) === null || _f === void 0 ? void 0 : _f.cachedContent,
      contents: [...this._history, newContent]
    };
    const chatSessionRequestOptions = Object.assign(Object.assign({}, this._requestOptions), requestOptions);
    let finalResult;
    this._sendPromise = this._sendPromise.then(() => generateContent(this._apiKey, this.model, generateContentRequest, chatSessionRequestOptions)).then((result) => {
      var _a2;
      if (isValidResponse(result.response)) {
        this._history.push(newContent);
        const responseContent = Object.assign({
          parts: [],
          // Response seems to come back without a role set.
          role: "model"
        }, (_a2 = result.response.candidates) === null || _a2 === void 0 ? void 0 : _a2[0].content);
        this._history.push(responseContent);
      } else {
        const blockErrorMessage = formatBlockErrorMessage(result.response);
        if (blockErrorMessage) {
          console.warn(`sendMessage() was unsuccessful. ${blockErrorMessage}. Inspect response object for details.`);
        }
      }
      finalResult = result;
    }).catch((e) => {
      this._sendPromise = Promise.resolve();
      throw e;
    });
    await this._sendPromise;
    return finalResult;
  }
  /**
   * Sends a chat message and receives the response as a
   * {@link GenerateContentStreamResult} containing an iterable stream
   * and a response promise.
   *
   * Fields set in the optional {@link SingleRequestOptions} parameter will
   * take precedence over the {@link RequestOptions} values provided to
   * {@link GoogleGenerativeAI.getGenerativeModel }.
   */
  async sendMessageStream(request, requestOptions = {}) {
    var _a, _b, _c, _d, _e, _f;
    await this._sendPromise;
    const newContent = formatNewContent(request);
    const generateContentRequest = {
      safetySettings: (_a = this.params) === null || _a === void 0 ? void 0 : _a.safetySettings,
      generationConfig: (_b = this.params) === null || _b === void 0 ? void 0 : _b.generationConfig,
      tools: (_c = this.params) === null || _c === void 0 ? void 0 : _c.tools,
      toolConfig: (_d = this.params) === null || _d === void 0 ? void 0 : _d.toolConfig,
      systemInstruction: (_e = this.params) === null || _e === void 0 ? void 0 : _e.systemInstruction,
      cachedContent: (_f = this.params) === null || _f === void 0 ? void 0 : _f.cachedContent,
      contents: [...this._history, newContent]
    };
    const chatSessionRequestOptions = Object.assign(Object.assign({}, this._requestOptions), requestOptions);
    const streamPromise = generateContentStream(this._apiKey, this.model, generateContentRequest, chatSessionRequestOptions);
    this._sendPromise = this._sendPromise.then(() => streamPromise).catch((_ignored) => {
      throw new Error(SILENT_ERROR);
    }).then((streamResult) => streamResult.response).then((response) => {
      if (isValidResponse(response)) {
        this._history.push(newContent);
        const responseContent = Object.assign({}, response.candidates[0].content);
        if (!responseContent.role) {
          responseContent.role = "model";
        }
        this._history.push(responseContent);
      } else {
        const blockErrorMessage = formatBlockErrorMessage(response);
        if (blockErrorMessage) {
          console.warn(`sendMessageStream() was unsuccessful. ${blockErrorMessage}. Inspect response object for details.`);
        }
      }
    }).catch((e) => {
      if (e.message !== SILENT_ERROR) {
        console.error(e);
      }
    });
    return streamPromise;
  }
};
async function countTokens(apiKey, model, params, singleRequestOptions) {
  const response = await makeModelRequest(model, Task.COUNT_TOKENS, apiKey, false, JSON.stringify(params), singleRequestOptions);
  return response.json();
}
async function embedContent(apiKey, model, params, requestOptions) {
  const response = await makeModelRequest(model, Task.EMBED_CONTENT, apiKey, false, JSON.stringify(params), requestOptions);
  return response.json();
}
async function batchEmbedContents(apiKey, model, params, requestOptions) {
  const requestsWithModel = params.requests.map((request) => {
    return Object.assign(Object.assign({}, request), { model });
  });
  const response = await makeModelRequest(model, Task.BATCH_EMBED_CONTENTS, apiKey, false, JSON.stringify({ requests: requestsWithModel }), requestOptions);
  return response.json();
}
var GenerativeModel = class {
  constructor(apiKey, modelParams, _requestOptions = {}) {
    this.apiKey = apiKey;
    this._requestOptions = _requestOptions;
    if (modelParams.model.includes("/")) {
      this.model = modelParams.model;
    } else {
      this.model = `models/${modelParams.model}`;
    }
    this.generationConfig = modelParams.generationConfig || {};
    this.safetySettings = modelParams.safetySettings || [];
    this.tools = modelParams.tools;
    this.toolConfig = modelParams.toolConfig;
    this.systemInstruction = formatSystemInstruction(modelParams.systemInstruction);
    this.cachedContent = modelParams.cachedContent;
  }
  /**
   * Makes a single non-streaming call to the model
   * and returns an object containing a single {@link GenerateContentResponse}.
   *
   * Fields set in the optional {@link SingleRequestOptions} parameter will
   * take precedence over the {@link RequestOptions} values provided to
   * {@link GoogleGenerativeAI.getGenerativeModel }.
   */
  async generateContent(request, requestOptions = {}) {
    var _a;
    const formattedParams = formatGenerateContentInput(request);
    const generativeModelRequestOptions = Object.assign(Object.assign({}, this._requestOptions), requestOptions);
    return generateContent(this.apiKey, this.model, Object.assign({ generationConfig: this.generationConfig, safetySettings: this.safetySettings, tools: this.tools, toolConfig: this.toolConfig, systemInstruction: this.systemInstruction, cachedContent: (_a = this.cachedContent) === null || _a === void 0 ? void 0 : _a.name }, formattedParams), generativeModelRequestOptions);
  }
  /**
   * Makes a single streaming call to the model and returns an object
   * containing an iterable stream that iterates over all chunks in the
   * streaming response as well as a promise that returns the final
   * aggregated response.
   *
   * Fields set in the optional {@link SingleRequestOptions} parameter will
   * take precedence over the {@link RequestOptions} values provided to
   * {@link GoogleGenerativeAI.getGenerativeModel }.
   */
  async generateContentStream(request, requestOptions = {}) {
    var _a;
    const formattedParams = formatGenerateContentInput(request);
    const generativeModelRequestOptions = Object.assign(Object.assign({}, this._requestOptions), requestOptions);
    return generateContentStream(this.apiKey, this.model, Object.assign({ generationConfig: this.generationConfig, safetySettings: this.safetySettings, tools: this.tools, toolConfig: this.toolConfig, systemInstruction: this.systemInstruction, cachedContent: (_a = this.cachedContent) === null || _a === void 0 ? void 0 : _a.name }, formattedParams), generativeModelRequestOptions);
  }
  /**
   * Gets a new {@link ChatSession} instance which can be used for
   * multi-turn chats.
   */
  startChat(startChatParams) {
    var _a;
    return new ChatSession(this.apiKey, this.model, Object.assign({ generationConfig: this.generationConfig, safetySettings: this.safetySettings, tools: this.tools, toolConfig: this.toolConfig, systemInstruction: this.systemInstruction, cachedContent: (_a = this.cachedContent) === null || _a === void 0 ? void 0 : _a.name }, startChatParams), this._requestOptions);
  }
  /**
   * Counts the tokens in the provided request.
   *
   * Fields set in the optional {@link SingleRequestOptions} parameter will
   * take precedence over the {@link RequestOptions} values provided to
   * {@link GoogleGenerativeAI.getGenerativeModel }.
   */
  async countTokens(request, requestOptions = {}) {
    const formattedParams = formatCountTokensInput(request, {
      model: this.model,
      generationConfig: this.generationConfig,
      safetySettings: this.safetySettings,
      tools: this.tools,
      toolConfig: this.toolConfig,
      systemInstruction: this.systemInstruction,
      cachedContent: this.cachedContent
    });
    const generativeModelRequestOptions = Object.assign(Object.assign({}, this._requestOptions), requestOptions);
    return countTokens(this.apiKey, this.model, formattedParams, generativeModelRequestOptions);
  }
  /**
   * Embeds the provided content.
   *
   * Fields set in the optional {@link SingleRequestOptions} parameter will
   * take precedence over the {@link RequestOptions} values provided to
   * {@link GoogleGenerativeAI.getGenerativeModel }.
   */
  async embedContent(request, requestOptions = {}) {
    const formattedParams = formatEmbedContentInput(request);
    const generativeModelRequestOptions = Object.assign(Object.assign({}, this._requestOptions), requestOptions);
    return embedContent(this.apiKey, this.model, formattedParams, generativeModelRequestOptions);
  }
  /**
   * Embeds an array of {@link EmbedContentRequest}s.
   *
   * Fields set in the optional {@link SingleRequestOptions} parameter will
   * take precedence over the {@link RequestOptions} values provided to
   * {@link GoogleGenerativeAI.getGenerativeModel }.
   */
  async batchEmbedContents(batchEmbedContentRequest, requestOptions = {}) {
    const generativeModelRequestOptions = Object.assign(Object.assign({}, this._requestOptions), requestOptions);
    return batchEmbedContents(this.apiKey, this.model, batchEmbedContentRequest, generativeModelRequestOptions);
  }
};
var GoogleGenerativeAI = class {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }
  /**
   * Gets a {@link GenerativeModel} instance for the provided model name.
   */
  getGenerativeModel(modelParams, requestOptions) {
    if (!modelParams.model) {
      throw new GoogleGenerativeAIError(`Must provide a model name. Example: genai.getGenerativeModel({ model: 'my-model-name' })`);
    }
    return new GenerativeModel(this.apiKey, modelParams, requestOptions);
  }
  /**
   * Creates a {@link GenerativeModel} instance from provided content cache.
   */
  getGenerativeModelFromCachedContent(cachedContent, modelParams, requestOptions) {
    if (!cachedContent.name) {
      throw new GoogleGenerativeAIRequestInputError("Cached content must contain a `name` field.");
    }
    if (!cachedContent.model) {
      throw new GoogleGenerativeAIRequestInputError("Cached content must contain a `model` field.");
    }
    const disallowedDuplicates = ["model", "systemInstruction"];
    for (const key of disallowedDuplicates) {
      if ((modelParams === null || modelParams === void 0 ? void 0 : modelParams[key]) && cachedContent[key] && (modelParams === null || modelParams === void 0 ? void 0 : modelParams[key]) !== cachedContent[key]) {
        if (key === "model") {
          const modelParamsComp = modelParams.model.startsWith("models/") ? modelParams.model.replace("models/", "") : modelParams.model;
          const cachedContentComp = cachedContent.model.startsWith("models/") ? cachedContent.model.replace("models/", "") : cachedContent.model;
          if (modelParamsComp === cachedContentComp) {
            continue;
          }
        }
        throw new GoogleGenerativeAIRequestInputError(`Different value for "${key}" specified in modelParams (${modelParams[key]}) and cachedContent (${cachedContent[key]})`);
      }
    }
    const modelParamsFromCache = Object.assign(Object.assign({}, modelParams), { model: cachedContent.model, tools: cachedContent.tools, toolConfig: cachedContent.toolConfig, systemInstruction: cachedContent.systemInstruction, cachedContent });
    return new GenerativeModel(this.apiKey, modelParamsFromCache, requestOptions);
  }
};

// commands/chat.ts
var chat_default = {
  data: {
    name: "chat",
    // The name of the command
    description: "Chat with Gemini AI",
    // The description of the command
    options: [
      {
        name: "prompt",
        // The name of the prompt option
        description: "The prompt for the AI",
        // The description of the prompt option
        type: ApplicationCommandOptionType.String,
        required: true
      },
      {
        name: "image",
        // The name of the image option
        description: "Optional image to include in the prompt",
        // The description of the image option
        type: ApplicationCommandOptionType.Attachment,
        required: false
      }
    ]
  },
  async execute(data) {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || "");
    const model = genAI.getGenerativeModel({
      model: process.env.GOOGLE_AI_MODEL || "gemini-1.5-flash"
    });
    const interaction = data.interaction;
    if (interaction.data.type !== ApplicationCommandType.ChatInput) {
      return {
        content: "This command can only be used as a chat input (slash) command.",
        flags: MessageFlags.Ephemeral
        // Make the response visible only to the user
      };
    }
    const chatInteraction = interaction;
    const promptOption = chatInteraction.data.options?.find(
      (option) => option.name === "prompt"
    );
    const imageOption = chatInteraction.data.options?.find(
      (option) => option.name === "image"
    );
    const prompt = promptOption?.value || "";
    const imageAttachment = chatInteraction.data.resolved?.attachments?.[imageOption?.value || ""];
    if (prompt.length > 2e3) {
      return {
        content: "Prompt must be less than 2000 characters.",
        flags: MessageFlags.Ephemeral
      };
    }
    try {
      let parts = [prompt];
      if (imageAttachment) {
        const imageBuffer = await (await fetch(imageAttachment.url)).arrayBuffer();
        const imageBase64 = Buffer.from(imageBuffer).toString("base64");
        const image = {
          inlineData: {
            data: imageBase64,
            // The base64 encoded image data
            mimeType: imageAttachment.content_type
            // The MIME type of the image
          }
        };
        parts = [prompt, image];
      }
      const result = await model.generateContent(parts);
      const response = result.response.text();
      const truncatedResponse = response.length > 1900 ? response.slice(0, 1900) + "\n...[truncated to keep below 2000 characters]" : response;
      return {
        content: truncatedResponse
      };
    } catch (error) {
      console.error("Error during AI chat:", error);
      return {
        content: "An error occurred while processing your request.",
        flags: MessageFlags.Ephemeral
      };
    }
  }
};

// commands/banner.ts
async function discordFetch2(url, opts = {}) {
  const u = new URL(url);
  const mod2 = u.protocol === "https:" ? await import("https") : await import("http");
  return new Promise((resolve, reject) => {
    const req = mod2.request(u, {
      method: opts.method || "GET",
      headers: { "Content-Type": "application/json", ...opts.headers }
    }, (res) => {
      let body = "";
      res.on("data", (chunk) => body += chunk);
      res.on("end", () => {
        if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(body));
          } catch {
            resolve(body);
          }
        } else {
          let msg = `HTTP ${res.statusCode}`;
          try {
            const d = JSON.parse(body);
            msg = d.message || msg;
          } catch {
          }
          reject(new Error(msg));
        }
      });
    });
    req.on("error", reject);
    if (opts.body) {
      if (typeof opts.body === "string") req.write(opts.body);
      else req.write(JSON.stringify(opts.body));
    }
    req.end();
  });
}
var banner_default = {
  data: {
    name: "banner",
    description: "Shows a user's banner",
    options: [
      {
        name: "user",
        description: "The user you want to see the banner of",
        type: ApplicationCommandOptionType.User,
        required: true
      }
    ]
  },
  async execute(data) {
    const userId = data.interaction.data.options?.find(
      (o) => o.name === "user"
    )?.value;
    if (!userId) {
      return {
        content: "You must specify a user.",
        flags: MessageFlags.Ephemeral
      };
    }
    const user = await discordFetch2(
      `https://discord.com/api/v10/users/${userId}`,
      {
        headers: {
          Authorization: `Bot ${process.env.DISCORD_TOKEN}`
        }
      }
    );
    if (!user.banner) {
      return {
        content: "This user doesn't have a banner.",
        flags: MessageFlags.Ephemeral
      };
    }
    const isAnimated = user.banner.startsWith("a_");
    const ext = isAnimated ? "gif" : "png";
    const bannerUrl = `https://cdn.discordapp.com/banners/${user.id}/${user.banner}.${ext}?size=1024`;
    return {
      embeds: [
        {
          color: 13213916,
          image: { url: bannerUrl }
        }
      ]
    };
  }
};

// .discraft/commands/index.ts
var commands_default = {
  userinfo: userinfo_default,
  profile: profile_default,
  ping: ping_default,
  chat: chat_default,
  banner: banner_default
};

// utils/types.ts
var import_discord_interactions = __toESM(require_dist(), 1);

// index.ts
var DISCORD_OWNER_ID = process.env.DISCORD_OWNER_ID || "";
var DISCORD_APP_ID = process.env.DISCORD_APP_ID || "";
var DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET || "";
var HMAC_SECRET = process.env.DISCORD_CLIENT_SECRET || process.env.DISCORD_TOKEN || "";
var OAUTH_REDIRECT = "https://nenchan.vercel.app/api";
if (!HMAC_SECRET) {
  console.error("FATAL: HMAC_SECRET is empty \u2014 set DISCORD_CLIENT_SECRET or DISCORD_TOKEN");
}
var rateLimitMap = /* @__PURE__ */ new Map();
var RATE_LIMIT_WINDOW = 6e4;
var RATE_LIMIT_MAX = 60;
function checkRateLimit(ip) {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW);
  if (recent.length >= RATE_LIMIT_MAX) return false;
  recent.push(now);
  rateLimitMap.set(ip, recent);
  if (rateLimitMap.size > 1e4) {
    const cutoff = now - RATE_LIMIT_WINDOW;
    for (const [key, vals] of rateLimitMap) {
      const filtered = vals.filter((t) => t > cutoff);
      if (filtered.length === 0) rateLimitMap.delete(key);
      else rateLimitMap.set(key, filtered);
    }
  }
  return true;
}
function parseLimit(val, fallback, max) {
  const n = parseInt(String(val), 10);
  if (isNaN(n) || n < 1) return fallback;
  return Math.min(n, max);
}
function clampMinutes(val) {
  const n = parseInt(String(val), 10);
  if (isNaN(n) || n < 0) return 0;
  return Math.min(n, 40320);
}
var MAX_CONTENT_LENGTH = 2e3;
var MAX_FILE_SIZE = 8 * 1024 * 1024;
var ALLOWED_FILE_TYPES = /^(image|video|audio|text)\//;
function validateContent(content) {
  if (content === void 0 || content === null) return "";
  if (typeof content !== "string") return null;
  if (content.length > MAX_CONTENT_LENGTH) return null;
  return content;
}
function validateFileUpload(fileData, fileName, fileType) {
  if (!fileData || !fileName) return null;
  if (typeof fileData !== "string" || typeof fileName !== "string") return null;
  let buf;
  try {
    buf = Buffer.from(fileData, "base64");
  } catch {
    return null;
  }
  if (buf.length > MAX_FILE_SIZE) return null;
  const safeName = fileName.replace(/[^\w.\-]/g, "_").slice(0, 100);
  const type = typeof fileType === "string" && ALLOWED_FILE_TYPES.test(fileType) ? fileType : "application/octet-stream";
  return { buf, blob: new Blob([buf], { type }), name: safeName };
}
function signState(state) {
  const sig = import_crypto.default.createHmac("sha256", HMAC_SECRET).update(state).digest("hex");
  return state + "." + sig;
}
function verifyState(signed) {
  try {
    const idx = signed.lastIndexOf(".");
    if (idx === -1) return false;
    const state = signed.slice(0, idx);
    const sig = signed.slice(idx + 1);
    const expected = import_crypto.default.createHmac("sha256", HMAC_SECRET).update(state).digest("hex");
    return import_crypto.default.timingSafeEqual(Buffer.from(sig, "hex"), Buffer.from(expected, "hex"));
  } catch {
    return false;
  }
}
function logRequest(method, path, action, ip, status) {
  console.log(JSON.stringify({ ts: (/* @__PURE__ */ new Date()).toISOString(), method, path, action: action || "-", ip, status }));
}
async function discordFetch3(url, opts = {}) {
  const u = new URL(url);
  const mod2 = u.protocol === "https:" ? await import("https") : await import("http");
  return new Promise((resolve, reject) => {
    const req = mod2.request(u, {
      method: opts.method || "GET",
      headers: opts.body ? { "Content-Type": "application/json", ...opts.headers } : { ...opts.headers }
    }, (res) => {
      let body = "";
      res.on("data", (chunk) => body += chunk);
      res.on("end", () => {
        if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(body));
          } catch {
            resolve(body);
          }
        } else {
          let msg = `HTTP ${res.statusCode}`;
          try {
            const d = JSON.parse(body);
            msg = d.message || msg;
          } catch {
          }
          reject(new Error(msg));
        }
      });
    });
    req.on("error", reject);
    if (opts.body) {
      if (typeof opts.body === "string") req.write(opts.body);
      else req.write(JSON.stringify(opts.body));
    }
    req.end();
  });
}
function signToken(userId) {
  const sig = import_crypto.default.createHmac("sha256", HMAC_SECRET).update(userId).digest("hex");
  return Buffer.from(userId).toString("base64") + "." + sig;
}
function verifyToken(token) {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return false;
    const userId = Buffer.from(parts[0], "base64").toString();
    const expectedSig = import_crypto.default.createHmac("sha256", HMAC_SECRET).update(userId).digest("hex");
    return import_crypto.default.timingSafeEqual(Buffer.from(parts[1], "hex"), Buffer.from(expectedSig, "hex"));
  } catch {
    return false;
  }
}
function getTokenFromRequest(req) {
  const cookie = req.headers.cookie;
  if (cookie) {
    const match = cookie.match(/token=([^;]+)/);
    if (match) return match[1];
  }
  const auth = req.headers.authorization;
  if (auth?.startsWith("Bearer ")) return auth.slice(7);
  return null;
}
var SNOWFLAKE_RE = /^\d{17,20}$/;
function isValidSnowflake(id) {
  return typeof id === "string" && SNOWFLAKE_RE.test(id);
}
function htmlEscape(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function html() {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>nenchan v1.0</title>
<link rel="icon" href="/favicon.ico" type="image/x-icon"/>
<style>
@font-face{font-family:'Space Grotesk';font-style:normal;font-weight:300 700;src:url('/fonts/space-grotesk-latin.woff2') format('woff2')}
*{box-sizing:border-box;margin:0;padding:0}
body{font:12px/1.4 'Space Grotesk',monospace;background:#13161b;color:#c0bcc4;height:100vh;overflow:hidden}
*::-webkit-scrollbar{width:0;height:0}
*{scrollbar-width:none;-ms-overflow-style:none}
.sidebar{width:160px;background:#191d23;border-right:1px solid #222;padding:12px;display:flex;flex-direction:column;gap:1px;height:100vh;overflow:hidden;position:fixed;top:0;left:0;z-index:10}
.sidebar-nav{flex:1;overflow-y:auto;display:flex;flex-direction:column;gap:1px}
.sidebar h1{font-size:11px;color:#6d6572;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;padding:0;text-align:center}
.sidebar button{background:none;border:none;color:#6d6572;font:11px 'Space Grotesk',monospace;padding:7px 10px;text-align:left;cursor:pointer;border-radius:4px;transition:all .15s;display:flex;align-items:center;gap:8px}
.sidebar button:hover{color:#c0bcc4;background:#1e2228}
.sidebar button.active{color:#e0dce4;background:#232830;border-left:2px solid #b48899;padding-left:8px}
.sidebar button img{width:14px;height:14px;opacity:.4;filter:grayscale(1)}
.sidebar button:hover img{opacity:.7}
.sidebar button.active img{opacity:1;filter:none}
#logoutBtn{margin-top:auto;padding:7px 10px;border-radius:4px;flex-shrink:0}
#logoutBtn img{opacity:1;filter:none}
.bocchi-wrap{text-align:center;padding:12px 0 8px}
.bocchi-wrap img{width:90px;height:auto;opacity:.85}
.main{flex:1;padding:16px;max-width:680px;margin-left:160px;height:100vh;overflow-y:auto}
.panel{display:none}
.panel.show{display:block}
#panel-messages.show{display:flex;flex-direction:column;height:calc(100vh - 80px)}
h2{font-size:12px;color:#6d6572;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;font-weight:400}
label{display:block;color:#6d6572;font-size:10px;text-transform:uppercase;margin-bottom:2px;margin-top:6px;font-weight:600}
input,textarea,select{width:100%;padding:4px 6px;border:1px solid #2e343c;border-radius:6px;background:#191d23;color:#c0bcc4;font:12px 'Space Grotesk',monospace;margin-bottom:6px;outline:none}
input:focus,textarea:focus,select:focus{border-color:#b48899}
button{padding:4px 10px;background:#252a32;color:#c0bcc4;border:1px solid #2e343c;border-radius:6px;font:11px 'Space Grotesk',monospace;cursor:pointer;transition:all .15s}
button:hover{background:#2e343c;color:#e0dce4}
button:disabled{opacity:0.4;cursor:not-allowed}
.flex{display:flex;gap:4px;margin-bottom:4px}
.flex button{flex:1}
.error{color:#d45555;font-size:11px;margin-bottom:4px}
.success{color:#55b488;font-size:11px;margin-bottom:4px}
textarea{resize:vertical;min-height:50px;font:12px 'Space Grotesk',monospace}
select option{background:#13161b;color:#c0bcc4}
.stat{background:#191d23;border:1px solid #252a32;padding:10px;margin-bottom:4px;border-radius:8px;transition:border-color .15s}
.stat:hover{border-color:#3a3340}
.stat span{color:#6d6572;font-size:10px;text-transform:uppercase;letter-spacing:.5px;font-weight:600}
.stat p{color:#e0dce4;font-size:13px;margin-top:2px}
.dash-banner{height:120px;background:#191d23;border:1px solid #252a32;border-radius:8px;margin-bottom:8px;overflow:hidden;background-size:cover;background-position:center}
.dash-header{display:flex;align-items:center;gap:14px;padding:16px;background:#191d23;border:1px solid #252a32;margin-bottom:8px;border-radius:8px;transition:border-color .15s}
.dash-header:hover{border-color:#3a3340}
.dash-icon{width:64px;height:64px;border-radius:18px;flex-shrink:0;background:#1e2228;border:1px solid #2e343c;overflow:hidden}
.dash-icon img{width:100%;height:100%;object-fit:cover}
.dash-info{flex:1;min-width:0}
.dash-name{color:#e0dce4;font-size:16px;font-weight:600;margin:0}
.dash-id{color:#5a5260;font-size:10px;margin-top:2px;font-weight:600}
.dash-grid{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:8px}
.dash-card{background:#191d23;border:1px solid #252a32;padding:8px 10px;display:flex;align-items:center;gap:10px;border-radius:8px;transition:border-color .15s;min-width:0}
.dash-card:hover{border-color:#3a3340}
.dash-card-icon{width:32px;height:32px;background:#fff;display:flex;align-items:center;justify-content:center;flex-shrink:0;border-radius:8px}
.dash-card-icon img{width:16px;height:16px}
.dash-card-label{color:#6d6572;font-size:9px;text-transform:uppercase;letter-spacing:.5px;font-weight:600}
.dash-card-val{color:#e0dce4;font-size:14px;margin-top:1px}
.dash-card-sub{color:#5a5260;font-size:9px;margin-top:1px;font-weight:600}
.dash-roles-wrap{background:#191d23;border:1px solid #252a32;border-radius:8px;overflow:hidden;margin-bottom:8px}
.dash-roles-header{display:flex;justify-content:space-between;align-items:center;padding:10px 12px;cursor:pointer}
.dash-roles-header span{color:#6d6572;font-size:10px;text-transform:uppercase;letter-spacing:.5px;font-weight:600}
.dash-roles-header .role-arrow{color:#5a5260;font-size:9px;transition:transform .2s}
.dash-roles-list{display:none;border-top:1px solid #252a32;padding:6px 8px}
.dash-roles-list.show{display:block}
.dash-roles-list::-webkit-scrollbar{width:4px}
.dash-roles-list::-webkit-scrollbar-thumb{background:#3a424c;border-radius:2px}
table{width:100%;border-collapse:collapse;font-size:11px;margin-top:4px}
td,th{padding:4px 6px;text-align:left;border-bottom:1px solid #2e343c;color:#9a929e}
th{color:#6d6572;font-size:10px;text-transform:uppercase;font-weight:600}
.member-row{cursor:pointer}
.member-row:hover{background:#1e2228}
.modal{position:fixed;inset:0;background:rgba(19,22,27,.88);display:none;justify-content:center;align-items:center;z-index:100}
.modal.show{display:flex}
.modal-box{background:#1e2228;border:1px solid #3a424c;padding:16px;width:90%;max-width:400px}
.modal-box h3{font-size:12px;color:#e0dce4;margin-bottom:8px}
.modal-box p{font-size:11px;color:#7d7582;margin-bottom:6px}
.stat[onclick]{cursor:pointer}
.stat[onclick]:hover{background:#0e0e0e}
.role-toggle{cursor:pointer;user-select:none}
.role-toggle:hover{color:#e0dce4}
.role-list{display:none;max-height:200px;overflow-y:auto;margin-top:4px;padding:4px 0;border-top:1px solid #2e343c}
.role-list.show{display:block}
.role-item{display:flex;align-items:center;gap:6px;padding:4px 6px;font-size:10px;color:#9a929e;border-radius:4px}
.role-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0;border:1px solid rgba(255,255,255,.05)}
#msgHistory{scrollbar-width:none;-ms-overflow-style:none}
#msgHistory::-webkit-scrollbar{display:none}
.msg-row{display:flex;gap:10px;padding:6px 8px;border-radius:6px;margin-bottom:2px;position:relative}
.msg-row:hover{background:#191d23}
.msg-row:hover .msg-del{opacity:1}
.msg-row:last-child{border-bottom:none}
.msg-avatar{width:34px;height:34px;border-radius:50%;flex-shrink:0;cursor:pointer}
.msg-body{flex:1;min-width:0}
.msg-author{font-weight:600;color:#e0dce4;font-size:12px;cursor:pointer}
.msg-author:hover{text-decoration:underline}
.msg-time{color:#5a5260;font-size:10px;margin-left:6px}
.msg-time-inline{color:#5a5260;font-size:9px;visibility:hidden;min-width:34px;text-align:center}
.msg-row:hover .msg-time-inline{visibility:visible}
.msg-edited{color:#5a5260;font-size:9px;margin-left:4px}
.msg-content{color:#c0bcc4;margin-top:2px;word-wrap:break-word;white-space:pre-wrap}
.msg-content .mention{color:#b48899;background:rgba(180,136,153,0.12);padding:0 4px;border-radius:3px;cursor:pointer;font-weight:500}
.msg-content .mention:hover{background:rgba(180,136,153,0.25)}
.msg-content code{background:#252a32;padding:1px 5px;border-radius:3px;font-size:11px;color:#e0dce4}
.msg-content pre{background:#191d23;border:1px solid #252a32;border-radius:6px;padding:8px;margin:4px 0;overflow-x:auto;font-size:10px;color:#e0dce4}
.msg-content pre code{background:none;padding:0}
.msg-content a{color:#b48899;text-decoration:none}
.msg-content a:hover{text-decoration:underline}
.msg-content blockquote{border-left:3px solid #b48899;padding-left:8px;color:#6d6572;margin:4px 0}
.msg-content .spoiler{background:#252a32;color:transparent;border-radius:3px;padding:0 4px;cursor:pointer}
.msg-content .spoiler:hover,.msg-content .spoiler.revealed{color:#c0bcc4;background:rgba(180,136,153,0.15)}
.msg-ref{color:#5a5260;font-size:10px;padding:2px 0 4px;border-left:2px solid #252a32;padding-left:8px;margin:2px 0 4px;display:flex;align-items:center;gap:4px}
.msg-ref:hover{color:#6d6572}
.msg-sticker{max-height:120px;border-radius:6px;margin:4px 0}
.msg-img{max-width:320px;max-height:240px;border-radius:6px;margin:4px 0;cursor:pointer;display:block}
.msg-video{max-width:380px;max-height:260px;border-radius:6px;margin:4px 0;display:block}
.msg-audio{max-width:320px;margin:4px 0}
.msg-file-link{color:#b48899;text-decoration:none;font-size:10px;padding:4px 8px;border:1px solid #252a32;border-radius:6px;display:inline-block;background:#191d23;transition:all .15s}
.msg-file-link:hover{border-color:#b48899;background:#1e2228}
.msg-embed{background:#191d23;border-left:3px solid #b48899;border-radius:0 6px 6px 0;padding:8px 10px;margin:6px 0;max-width:480px}
.msg-embed-author{color:#b48899;font-size:10px;font-weight:600;margin-bottom:2px}
.msg-embed-title{color:#e0dce4;font-size:12px;font-weight:600;margin-bottom:4px}
.msg-embed-title:hover{text-decoration:underline;cursor:pointer}
.msg-embed-desc{color:#c0bcc4;font-size:11px;line-height:1.5}
.msg-embed-field-name{color:#e0dce4;font-size:11px;font-weight:600;margin-top:6px}
.msg-embed-field-val{color:#c0bcc4;font-size:11px;line-height:1.4}
.msg-reactions{display:flex;flex-wrap:wrap;gap:4px;margin-top:4px}
.msg-reaction{display:inline-flex;align-items:center;gap:3px;padding:2px 6px;border:1px solid #252a32;border-radius:4px;background:#191d23;font-size:10px;color:#c0bcc4;cursor:pointer;transition:all .15s}
.msg-reaction:hover{border-color:#b48899;background:#1e2228}
.msg-reaction-count{font-weight:600;color:#e0dce4}
.msg-del{position:absolute;top:8px;right:8px;width:24px;height:24px;border-radius:4px;display:flex;align-items:center;justify-content:center;cursor:pointer;opacity:0;color:#6d6572;background:#191d23;border:1px solid #252a32;font-size:10px;transition:all .15s}
.msg-del:hover{color:#d45555;border-color:#d45555;background:rgba(212,85,85,0.1)}
.msg-day-divider{text-align:center;margin:12px 0 8px;position:relative}
.msg-day-divider span{background:#13161b;padding:0 10px;color:#5a5260;font-size:10px;position:relative;z-index:1}
.msg-day-divider::before{content:'';position:absolute;top:50%;left:0;right:0;height:1px;background:#1e2228}
.msg-group-start{margin-top:8px}
.msg-group-start .msg-avatar{visibility:visible}
.mention-list{display:none;position:absolute;top:100%;left:0;right:0;background:#191d23;border:1px solid #252a32;border-radius:0 0 8px 8px;max-height:180px;overflow-y:auto;z-index:90;box-shadow:0 8px 24px rgba(0,0,0,0.4)}
.mention-list.show{display:block}
.mention-list .mention-item{display:flex;align-items:center;gap:8px;padding:6px 10px;cursor:pointer;font-size:11px;color:#c0bcc4;transition:background .1s}
.mention-list .mention-item:hover{background:#252a32}
.mention-list .mention-item img{width:22px;height:22px;border-radius:50%}
.mention-list .mention-item .m-name{font-weight:500;color:#e0dce4}
.mention-list .mention-item .m-bot{font-size:8px;background:#b48899;color:#13161b;padding:1px 4px;border-radius:3px;margin-left:5px;font-weight:700;text-transform:uppercase;vertical-align:middle}
.drop-zone{border:1px dashed #252a32;border-radius:6px;padding:8px;text-align:center;color:#5a5260;font-size:10px;cursor:pointer;margin-bottom:8px;transition:all .15s}
.drop-zone:hover,.drop-zone.dragover{border-color:#b48899;color:#b48899;background:rgba(180,136,153,0.05)}
.drop-zone.has-file{border-color:#b48899;color:#b48899}
.msg-input-row{display:flex;gap:8px}
.msg-input-row textarea{flex:1;border:1px solid #252a32;border-radius:6px;background:#13161b;color:#c0bcc4;padding:8px 10px;font:11px 'Space Grotesk',monospace;resize:none;min-height:36px;max-height:120px;outline:none;margin:0}
.msg-input-row textarea:focus{border-color:#b48899}
.msg-input-row button{background:#b48899;color:#13161b;border:none;border-radius:6px;padding:8px 16px;font:11px 'Space Grotesk',monospace;font-weight:600;cursor:pointer;transition:background .15s}
.msg-input-row button:hover{background:#c9a0ae}
.msg-topbar{display:flex;gap:8px;margin-bottom:8px;align-items:center}
.msg-topbar select{flex:1;max-width:220px;border:1px solid #252a32;border-radius:6px;background:#191d23;color:#c0bcc4;padding:8px 10px;font:11px 'Space Grotesk',monospace;outline:none;cursor:pointer}
.msg-topbar select:focus{border-color:#b48899}
.msg-topbar-mention{flex:1;position:relative}
.msg-topbar-mention input{width:100%;padding:8px 10px;border:1px solid #252a32;border-radius:6px;background:#191d23;color:#c0bcc4;font:11px 'Space Grotesk',monospace;outline:none}
.msg-topbar-mention input:focus{border-color:#b48899}
.msg-topbar-channel{flex:1;max-width:220px;position:relative}
.msg-topbar-channel input{width:100%;padding:8px 10px;border:1px solid #252a32;border-radius:6px;background:#191d23;color:#c0bcc4;font:11px 'Space Grotesk',monospace;outline:none;margin:0}
.msg-topbar-channel input:focus{border-color:#b48899}
.msg-history-box{flex:1;min-height:0;overflow-y:auto;background:#13161b;border:1px solid #1e2228;border-radius:8px;padding:8px;font-size:11px;line-height:1.55;margin-bottom:8px;max-height:calc(100vh - 260px)}
.msg-history-box::-webkit-scrollbar{width:6px}
.msg-history-box::-webkit-scrollbar-track{background:#13161b}
.msg-history-box::-webkit-scrollbar-thumb{background:#252a32;border-radius:3px}
.msg-history-box::-webkit-scrollbar-thumb:hover{background:#363d47}
.msg-compose{background:#191d23;border:1px solid #1e2228;border-radius:8px;padding:10px}
.msg-status{font-size:10px;margin-top:6px;min-height:14px;color:#6d6572}
.sidebar-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:9}
.mobile-topbar{display:none}
@media(max-width:768px){
  .mobile-topbar{display:flex;position:sticky;top:0;z-index:50;background:#14181c;border:1px solid #252a32;align-items:center;justify-content:center;height:40px;margin:6px;border-radius:10px;box-shadow:0 4px 16px rgba(0,0,0,.4)}
  .mobile-topbar .menu-toggle-btn{background:none;border:none;color:#b48899;cursor:pointer;padding:0;position:absolute;left:8px;display:flex;align-items:center;justify-content:center}
  .mobile-topbar .menu-toggle-btn:hover{color:#d4b0be}
  .mobile-topbar .topbar-logo{height:22px;width:auto;opacity:.85}
  .sidebar{position:fixed;top:0;left:0;z-index:10;height:100dvh;transform:translateX(-100%);transition:transform .25s cubic-bezier(.4,0,.2,1);padding-top:52px;width:260px}
  .sidebar.open{transform:translateX(0);box-shadow:4px 0 24px rgba(0,0,0,.4)}
  .sidebar-overlay.show{display:block}
  .main{margin-left:0;padding:0 10px 10px}
  .dash-grid{grid-template-columns:1fr!important;gap:6px}
  .dash-card{padding:6px 8px}
  .dash-card-icon{width:28px;height:28px}
  .dash-card-val{font-size:14px}
  .dash-banner{height:80px}
  .dash-header{padding:10px;gap:10px;flex-wrap:wrap}
  .dash-icon{width:44px;height:44px;border-radius:12px}
  .msg-avatar{width:28px;height:28px}
  .msg-time,.msg-time-inline{font-size:8px}
  .msg-topbar{flex-direction:column;gap:4px}
  .msg-topbar select,.msg-topbar-channel,.msg-topbar-mention{max-width:100%}
  .msg-search-bar input{font-size:11px}
  .msg-compose{padding:8px}
  .msg-input-row textarea{min-height:32px;font-size:11px;padding:6px 8px}
  .msg-input-row button{padding:6px 12px;font-size:10px}
  .msg-edit-area textarea{font-size:11px}
  .emoji-picker-dropdown{width:280px;left:0;right:auto}
  .member-stats{flex-wrap:wrap;gap:4px}
  .member-stat{flex:1;min-width:60px;padding:8px}
  .member-stat span{font-size:8px}
  .member-stat p{font-size:16px}
  .member-card{padding:6px 8px}
  .member-avatar{width:28px;height:28px}
  .ban-card{padding:8px}
  .ban-card-actions{flex-direction:column;gap:4px;width:100%}
  .ban-card-actions button{width:100%;text-align:center;padding:8px}
  .invite-card{padding:8px;flex-wrap:wrap}
  .invite-code{font-size:10px;word-break:break-all}
  .emoji-picker-grid{grid-template-columns:repeat(6,1fr)}
  .event-card{padding:8px;flex-wrap:wrap;gap:4px}
  .event-del{padding:6px 12px;width:100%;text-align:center}
  .channel-card{padding:6px 8px;flex-wrap:wrap}
  .channel-del{padding:6px 12px;width:100%;text-align:center}
  .create-form{flex-direction:column}
  .create-form input,.create-form select,.create-form button{width:100%}
  .role-manager{max-height:150px}
  .msg-topbar-channel{max-width:100%}
  .toast{bottom:10px;right:10px;left:10px;max-width:none;text-align:center}
  .bocchi-wrap img{width:60px}
  .dash-roles-list{font-size:10px}
  .role-item{padding:3px 5px}
  #panel-messages.show{height:calc(100dvh - 68px)}
  .msg-history-box{max-height:calc(100dvh - 290px)}
  .confirm-box{width:calc(100% - 32px);padding:16px}
  .modal-box{width:calc(100% - 32px);margin:16px auto;max-height:calc(100dvh - 32px)}
}
.member-grid{display:flex;flex-direction:column;gap:6px;max-height:calc(100vh - 180px);overflow-y:auto;scrollbar-width:none;-ms-overflow-style:none}
.member-grid::-webkit-scrollbar{display:none}
.member-card{display:flex;align-items:center;gap:10px;padding:8px 10px;background:#191d23;border:1px solid #252a32;border-radius:8px;cursor:pointer;transition:border-color .15s}
.member-card:hover{border-color:#3a3340}
.member-avatar{width:34px;height:34px;border-radius:50%;flex-shrink:0;border:2px solid #252a32}
.member-info{flex:1;min-width:0}
.member-name{color:#e0dce4;font-size:11px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.member-name span{color:#5a5260;font-size:10px;font-weight:400}
.member-username{color:#5a5260;font-size:10px}
.member-badges{display:flex;gap:3px;margin-top:2px}
.member-badge{font-size:8px;padding:1px 4px;border-radius:2px;font-weight:600;text-transform:uppercase;letter-spacing:.3px}
.badge-boost{background:rgba(180,136,153,.15);color:#b48899}
.member-roles{display:flex;gap:3px;flex-wrap:wrap;margin-top:3px}
.role-badge{font-size:9px;padding:1px 5px;border-radius:3px;background:#252a32;color:#7d7582;border:1px solid #2e343c;white-space:nowrap;font-weight:600}
.role-group-header{font-size:10px;color:#6d6572;text-transform:uppercase;letter-spacing:.5px;padding:10px 8px 6px;margin-top:10px;font-weight:600;display:flex;align-items:center;gap:6px}
.role-group-header:first-child{margin-top:0}
.role-group-count{color:#5a5260;font-weight:400;font-size:10px}
.member-joined{color:#5a5260;font-size:9px;flex-shrink:0;font-weight:600}
.member-search{width:100%;padding:8px 10px;border:1px solid #2e343c;border-radius:8px;background:#191d23;color:#c0bcc4;font:12px 'Space Grotesk',monospace;margin-bottom:10px;outline:none;transition:border-color .15s}
.member-search:focus{border-color:#b48899}
.member-search::placeholder{color:#5a5260}
.member-stats{display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-bottom:10px}
.member-stat{text-align:center;padding:10px 6px;background:#191d23;border:1px solid #252a32;border-radius:8px;transition:border-color .15s}
.member-stat:hover{border-color:#3a3340}
.member-stat span{display:block;font-size:9px;color:#6d6572;text-transform:uppercase;letter-spacing:.5px;font-weight:600}
.member-stat p{font-size:14px;color:#e0dce4;margin-top:2px;font-weight:600}
.modal-box{background:#1e2228;border:1px solid #3a424c;padding:0;width:90%;max-width:400px;overflow:hidden;border-radius:12px}
.modal-banner{height:80px;background-size:cover;background-position:center}
.modal-banner-color{height:8px}
.modal-header{display:flex;align-items:center;gap:12px;padding:16px;border-bottom:1px solid #252a32;background:#1e2228}
.modal-header img{width:48px;height:48px;border-radius:50%;border:3px solid #252a32;flex-shrink:0}
.modal-header-info h3{font-size:13px;color:#e0dce4;margin:0;font-weight:600}
.modal-header-info p{font-size:10px;color:#5a5260;margin:2px 0 0}
.modal-body{padding:12px 16px}
.modal-section{margin-bottom:10px}
.modal-section-label{font-size:9px;color:#6d6572;text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px;font-weight:600}
.modal-roles{display:flex;flex-wrap:wrap;gap:4px}
.modal-role{display:flex;align-items:center;gap:4px;font-size:10px;color:#9a929e;padding:3px 8px;background:#252a32;border:1px solid #2e343c;border-radius:4px}
.modal-role-dot{width:6px;height:6px;border-radius:50%;flex-shrink:0}
.file-picker{position:relative;display:flex;align-items:center;gap:4px}
.file-picker input[type=file]{position:absolute;inset:0;opacity:0;cursor:pointer;width:100%}
.file-label{flex:1;padding:5px 8px;background:#191d23;border:1px solid #2e343c;color:#5a5260;font:11px 'Space Grotesk',monospace;cursor:pointer;display:flex;align-items:center;gap:6px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}
.file-label:hover{border-color:#4a4350;color:#7d7582}
.file-label.has-file{color:#c0bcc4;border-color:#3a3340}
.modal-footer{padding:10px 16px;border-top:1px solid #252a32;text-align:right}
.modal-footer button{background:#252a32;color:#9a929e;border:1px solid #2e343c;padding:5px 16px;font:11px 'Space Grotesk',monospace;cursor:pointer;border-radius:6px;transition:all .15s}
.modal-footer button:hover{background:#2e343c;color:#e0dce4}
.modal-actions{display:flex;gap:4px;padding:10px 16px;border-top:1px solid #252a32;background:#1e2228}
.modal-actions button{flex:1;padding:6px 8px;font-size:10px;border:1px solid #3a424c;background:#252a32;color:#9a929e;cursor:pointer;font-family:'Space Grotesk',monospace;border-radius:6px;transition:all .15s}
.modal-actions button:hover{background:#2e343c;color:#e0dce4}
.btn-ban{border-color:#d45555 !important;color:#d45555 !important}
.btn-ban:hover{background:#d45555 !important;color:#e0dce4 !important}
.btn-kick{border-color:#e8a630 !important;color:#e8a630 !important}
.btn-kick:hover{background:#e8a630 !important;color:#13161b !important}
.btn-timeout{border-color:#b48899 !important;color:#b48899 !important}
.btn-timeout:hover{background:#b48899 !important;color:#13161b !important}
.confirm-overlay{position:fixed;inset:0;background:rgba(19,22,27,.88);display:none;justify-content:center;align-items:center;z-index:200}
.confirm-overlay.show{display:flex}
.confirm-box{background:#1e2228;border:1px solid #3a424c;padding:0;width:90%;max-width:320px;overflow:hidden;border-radius:12px}
.confirm-title{padding:12px 16px;font-size:12px;color:#e0dce4;border-bottom:1px solid #252a32;font-weight:600}
.confirm-body{padding:12px 16px}
.confirm-body label{display:block;color:#6d6572;font-size:9px;text-transform:uppercase;margin-bottom:2px;margin-top:8px;font-weight:600}
.confirm-body label:first-child{margin-top:0}
.confirm-body input,.confirm-body select,.confirm-body textarea{width:100%;padding:6px 8px;border:1px solid #2e343c;border-radius:6px;background:#13161b;color:#c0bcc4;font:11px 'Space Grotesk',monospace;outline:none;margin:0}
.confirm-body input:focus,.confirm-body textarea:focus{border-color:#b48899}
.confirm-footer{display:flex;gap:4px;padding:8px 16px;border-top:1px solid #252a32}
.confirm-footer button{flex:1;padding:6px 10px;font-size:11px;border:1px solid #3a424c;background:#252a32;color:#9a929e;cursor:pointer;font-family:'Space Grotesk',monospace;border-radius:6px;transition:all .15s}
.confirm-footer button:hover{background:#2e343c;color:#e0dce4}
.confirm-footer .confirm-danger{border-color:#d45555;color:#d45555}
.confirm-footer .confirm-danger:hover{background:#d45555;color:#e0dce4}
.dm-channel{display:flex;align-items:center;gap:10px;padding:8px 10px;background:#191d23;border:1px solid #252a32;border-radius:8px;cursor:pointer;transition:border-color .15s;margin-bottom:4px}
.dm-channel:hover{border-color:#3a3340}
.dm-channel img{width:34px;height:34px;border-radius:50%;flex-shrink:0;border:2px solid #252a32}
.dm-channel-name{color:#e0dce4;font-size:11px;font-weight:600}
.dm-channel-preview{color:#5a5260;font-size:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.dm-channel-time{color:#5a5260;font-size:9px;flex-shrink:0;margin-left:auto;font-weight:600}
.mention-list{display:none;position:absolute;top:100%;left:0;right:0;background:#1e2228;border:1px solid #2e343c;border-top:none;max-height:180px;overflow-y:auto;z-index:10;scrollbar-width:none;border-radius:0 0 8px 8px}
.mention-list::-webkit-scrollbar{display:none}
.mention-list.show{display:block}
.mention-item{display:flex;align-items:center;gap:8px;padding:5px 8px;cursor:pointer;font-size:11px;color:#c0bcc4;transition:background .15s}
.mention-item:hover{background:#252a32}
.mention-item img{width:20px;height:20px;border-radius:50%;flex-shrink:0}
.mention-item .m-name{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.mention-item .m-bot{color:#b48899;font-size:8px;text-transform:uppercase;font-weight:600;margin-left:4px}
.channel-list{display:none;position:absolute;top:100%;left:0;right:0;background:#1e2228;border:1px solid #2e343c;border-top:none;max-height:200px;overflow-y:auto;z-index:10;scrollbar-width:none;border-radius:0 0 8px 8px}
.channel-list::-webkit-scrollbar{display:none}
.channel-list.show{display:block}
.channel-item{display:flex;align-items:center;gap:6px;padding:5px 8px;cursor:pointer;font-size:11px;color:#c0bcc4;transition:background .15s}
.channel-item:hover{background:#252a32}
.channel-item .ch-hash{color:#5a5260;font-weight:600;flex-shrink:0}
.channel-item .ch-name{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.channel-item .ch-topic{color:#5a5260;font-size:9px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:120px}
.channel-item.selected{background:#232830;color:#e0dce4}
.channel-item.selected .ch-hash{color:#b48899}
.ban-card{display:flex;align-items:center;gap:12px;padding:10px 12px;border-bottom:1px solid #252a32;transition:background .15s}
.ban-card:last-child{border-bottom:none}
.ban-card:hover{background:#252a32}
.ban-card img{width:36px;height:36px;border-radius:50%;flex-shrink:0}
.ban-info{flex:1;min-width:0}
.ban-name{color:#e0dce4;font-size:12px;font-weight:600}
.ban-name span{color:#5a5260;font-size:10px;font-weight:400;margin-left:4px}
.ban-username{color:#5a5260;font-size:10px;margin-top:1px}
.ban-reason{color:#d45555;font-size:10px;margin-top:3px;font-weight:600;padding:2px 6px;background:rgba(212,85,85,.1);border-radius:4px;display:inline-block}
.ban-unban-btn{padding:5px 14px;font-size:10px;border:1px solid #d45555;border-radius:6px;background:transparent;color:#d45555;cursor:pointer;font-family:'Space Grotesk',monospace;flex-shrink:0;font-weight:600;transition:all .15s}
.ban-unban-btn:hover{background:#d45555;color:#fff}
.timeout-card{display:flex;align-items:center;gap:12px;padding:10px 12px;border-bottom:1px solid #252a32;transition:background .15s}
.timeout-card:last-child{border-bottom:none}
.timeout-card:hover{background:#252a32}
.timeout-card img{width:36px;height:36px;border-radius:50%;flex-shrink:0}
.timeout-info{flex:1;min-width:0}
.timeout-name{color:#e0dce4;font-size:12px;font-weight:600}
.timeout-name span{color:#5a5260;font-size:10px;font-weight:400;margin-left:4px}
.timeout-username{color:#5a5260;font-size:10px;margin-top:1px}
.timeout-detail{font-size:10px;margin-top:3px;display:flex;gap:8px;flex-wrap:wrap;align-items:center}
.timeout-expiry{color:#b48899;font-weight:600}
.timeout-remaining{color:#6d6572;font-size:9px;padding:1px 5px;background:#252a32;border-radius:3px}
.timeout-reason{color:#e8a630;font-weight:600;padding:1px 5px;background:rgba(232,166,48,.1);border-radius:3px}
.timeout-remove{padding:5px 14px;font-size:10px;border:1px solid #b48899;border-radius:6px;background:transparent;color:#b48899;cursor:pointer;font-family:'Space Grotesk',monospace;flex-shrink:0;font-weight:600;transition:all .15s}
.timeout-remove:hover{background:#b48899;color:#13161b}
.mod-section-title{font-size:10px;color:#6d6572;text-transform:uppercase;letter-spacing:.5px;padding:12px 12px 8px;font-weight:600;display:flex;align-items:center;gap:6px}
.mod-section-title .count{color:#5a5260;font-weight:400;background:#252a32;padding:1px 6px;border-radius:10px;font-size:9px;margin-left:4px}
.mod-section-title .dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}
.mod-section{margin-bottom:8px;background:#191d23;border:1px solid #252a32;border-radius:8px;overflow:hidden}
.mod-empty{padding:16px 12px;color:#5a5260;font-size:10px;text-align:center}
.mod-search{display:flex;gap:6px;margin-bottom:8px}
.mod-search input{flex:1}
.mod-search button{padding:5px 14px;white-space:nowrap}
.msg-edit-btn{position:absolute;top:8px;right:32px;width:24px;height:24px;border-radius:4px;display:flex;align-items:center;justify-content:center;cursor:pointer;opacity:0;color:#6d6572;background:#191d23;border:1px solid #252a32;font-size:10px;transition:all .15s}
.msg-row:hover .msg-edit-btn{opacity:1}
.msg-edit-btn:hover{color:#b48899;border-color:#b48899;background:rgba(180,136,153,0.1)}
.msg-edit-area{margin-top:4px}
.msg-edit-area textarea{width:100%;padding:6px 8px;border:1px solid #b48899;border-radius:6px;background:#13161b;color:#c0bcc4;font:11px 'Space Grotesk',monospace;resize:none;min-height:36px;outline:none}
.msg-edit-actions{display:flex;gap:4px;margin-top:4px}
.msg-edit-actions button{padding:3px 10px;font-size:10px;border-radius:4px;border:none;cursor:pointer;font-family:'Space Grotesk',monospace}
.msg-edit-save{background:#b48899;color:#13161b}
.msg-edit-cancel{background:#252a32;color:#7d7582}
.msg-search-bar{display:flex;gap:6px;margin-bottom:8px}
.msg-search-bar input{flex:1;padding:6px 10px;border:1px solid #252a32;border-radius:6px;background:#191d23;color:#c0bcc4;font:11px 'Space Grotesk',monospace;outline:none}
.msg-search-bar input:focus{border-color:#b48899}
.msg-search-bar button{padding:5px 12px}
.msg-load-more{text-align:center;padding:8px;cursor:pointer;color:#b48899;font-size:10px;border:1px solid #252a32;border-radius:6px;background:#191d23;transition:all .15s;margin-bottom:8px}
.msg-load-more:hover{border-color:#b48899;background:#1e2228}
.audit-entry{display:flex;gap:10px;padding:8px 10px;border-bottom:1px solid #252a32;transition:background .15s;font-size:11px}
.audit-entry:hover{background:#1e2228}
.audit-entry:last-child{border-bottom:none}
.audit-avatar{width:28px;height:28px;border-radius:50%;flex-shrink:0}
.audit-info{flex:1;min-width:0}
.audit-action{color:#c0bcc4;line-height:1.4}
.audit-action b{color:#e0dce4;font-weight:600}
.audit-action .hl{color:#b48899}
.audit-time{color:#5a5260;font-size:9px;flex-shrink:0;margin-left:auto;font-weight:600}
.invite-card{display:flex;align-items:center;gap:10px;padding:8px 10px;border-bottom:1px solid #252a32;transition:background .15s}
.invite-card:last-child{border-bottom:none}
.invite-card:hover{background:#1e2228}
.invite-code{color:#b48899;font-family:monospace;font-size:11px;font-weight:600}
.invite-info{flex:1;min-width:0}
.invite-meta{color:#5a5260;font-size:9px;margin-top:2px}
.invite-uses{color:#6d6572;font-size:10px}
.invite-del{padding:4px 10px;font-size:9px;border:1px solid #d45555;color:#d45555;background:transparent;border-radius:4px;cursor:pointer;font-family:'Space Grotesk',monospace;transition:all .15s;flex-shrink:0}
.invite-del:hover{background:#d45555;color:#fff}
.emoji-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(48px,1fr));gap:4px;max-height:300px;overflow-y:auto;padding:4px}
.emoji-grid::-webkit-scrollbar{width:4px}
.emoji-grid::-webkit-scrollbar-thumb{background:#252a32;border-radius:2px}
.emoji-item{display:flex;flex-direction:column;align-items:center;gap:2px;padding:6px;border-radius:6px;cursor:pointer;transition:background .15s}
.emoji-item:hover{background:#252a32}
.emoji-item img{width:32px;height:32px}
.emoji-item span{font-size:8px;color:#5a5260;text-align:center;word-break:break-all;max-width:48px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.event-card{padding:10px 12px;border-bottom:1px solid #252a32;transition:background .15s}
.event-card:last-child{border-bottom:none}
.event-card:hover{background:#1e2228}
.event-name{color:#e0dce4;font-size:12px;font-weight:600}
.event-time{color:#b48899;font-size:10px;margin-top:2px}
.event-desc{color:#6d6572;font-size:10px;margin-top:3px}
.event-status{font-size:9px;padding:2px 6px;border-radius:3px;font-weight:600;text-transform:uppercase;margin-left:6px}
.event-active{background:rgba(85,180,136,.15);color:#55b488}
.event-scheduled{background:rgba(180,136,153,.15);color:#b48899}
.event-completed{background:rgba(90,82,96,.15);color:#5a5260}
.event-cancelled{background:rgba(212,85,85,.15);color:#d45555}
.event-del{padding:4px 10px;font-size:9px;border:1px solid #d45555;color:#d45555;background:transparent;border-radius:4px;cursor:pointer;font-family:'Space Grotesk',monospace;transition:all .15s;flex-shrink:0;margin-top:4px}
.event-del:hover{background:#d45555;color:#fff}
.channel-card{display:flex;align-items:center;gap:10px;padding:8px 10px;border-bottom:1px solid #252a32;transition:background .15s}
.channel-card:last-child{border-bottom:none}
.channel-card:hover{background:#1e2228}
.channel-icon{color:#6d6572;font-size:14px;flex-shrink:0}
.channel-name{color:#e0dce4;font-size:11px;font-weight:600;flex:1}
.channel-type{color:#5a5260;font-size:9px;padding:2px 6px;background:#252a32;border-radius:3px;flex-shrink:0}
.channel-del{padding:4px 10px;font-size:9px;border:1px solid #d45555;color:#d45555;background:transparent;border-radius:4px;cursor:pointer;font-family:'Space Grotesk',monospace;transition:all .15s;flex-shrink:0}
.channel-del:hover{background:#d45555;color:#fff}
.create-form{display:flex;gap:6px;margin-bottom:10px;flex-wrap:wrap}
.create-form input,.create-form select{flex:1;min-width:100px}
.create-form button{white-space:nowrap}
.toast{position:fixed;bottom:20px;right:20px;padding:10px 16px;border-radius:8px;font:11px 'Space Grotesk',monospace;z-index:300;animation:toastIn .2s ease;max-width:320px}
.toast-success{background:#1e3a2a;border:1px solid #55b488;color:#55b488}
.toast-error{background:#3a1e1e;border:1px solid #d45555;color:#d45555}
@keyframes toastIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
.emoji-picker-wrap{position:relative;display:inline-block}
.emoji-picker-dropdown{display:none;position:absolute;bottom:100%;left:0;background:#1e2228;border:1px solid #3a424c;border-radius:8px;width:320px;max-height:360px;z-index:80;overflow:hidden;box-shadow:0 -8px 24px rgba(0,0,0,.4);display:none;flex-direction:column}
.emoji-picker-dropdown.show{display:flex}
.emoji-picker-search{margin:6px 8px;padding:5px 8px;background:#13161b;border:1px solid #2e343c;border-radius:6px;color:#c0bcc4;font:12px 'Space Grotesk',monospace;width:calc(100% - 16px);outline:none}
.emoji-picker-search:focus{border-color:#b48899}
.emoji-picker-grid{display:grid;grid-template-columns:repeat(8,1fr);gap:2px;padding:4px 8px 8px;overflow-y:auto;flex:1}
.emoji-picker-grid img{width:22px;height:22px;cursor:pointer;border-radius:4px;padding:2px;transition:background .1s}
.emoji-picker-grid img:hover{background:#252a32}
.role-manager{max-height:200px;overflow-y:auto;padding:4px 0;scrollbar-width:thin;scrollbar-color:#252a32 transparent}
.role-manager::-webkit-scrollbar{width:4px}
.role-manager::-webkit-scrollbar-thumb{background:#252a32;border-radius:2px}
.role-manage-item{display:flex;align-items:center;gap:6px;padding:4px 8px;border-radius:4px;cursor:pointer;transition:background .1s;font-size:10px;color:#9a929e}
.role-manage-item:hover{background:#252a32}
.role-manage-item .role-check{width:14px;height:14px;border:1px solid #3a424c;border-radius:3px;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:9px;transition:all .15s}
.role-manage-item.has-role .role-check{background:#b48899;border-color:#b48899;color:#13161b}
.role-manage-item.has-role{color:#e0dce4}
.activity-item{display:flex;align-items:center;gap:10px;padding:8px 10px;border-bottom:1px solid #252a32}
.activity-item:last-child{border-bottom:none}
.activity-item img{width:28px;height:28px;border-radius:50%;flex-shrink:0}
.activity-text{flex:1;font-size:11px;color:#c0bcc4}
.activity-text b{color:#e0dce4;font-weight:600}
.activity-time{color:#5a5260;font-size:9px;flex-shrink:0;font-weight:600}
.activity-badge{font-size:8px;padding:2px 6px;border-radius:3px;font-weight:600;text-transform:uppercase;margin-left:4px}
.badge-join{background:rgba(85,180,136,.15);color:#55b488}
.badge-ban{background:rgba(212,85,85,.15);color:#d45555}
.badge-boost{background:rgba(180,136,153,.15);color:#b48899}
.dash-edit-btn{background:none;border:none;color:#5a5260;cursor:pointer;font-size:10px;padding:2px 6px;border-radius:4px;transition:all .15s}
.dash-edit-btn:hover{color:#b48899;background:rgba(180,136,153,.1)}
</style>
</head>
<body>
<div class="mobile-topbar">
<button class="menu-toggle-btn" onclick="toggleMenu()"><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
<img src="/icons/nenchan.png" alt="nenchan" class="topbar-logo">
</div>
<div class="sidebar-overlay" id="menuOverlay" onclick="toggleMenu()"></div>
<div id="sidebar" class="sidebar" style="display:none">
<div class="sidebar-nav">
<button class="active" data-tab="dashboard" onclick="switchTab('dashboard')"><img src="/icons/dashboard.png" alt="">dashboard</button>
<button data-tab="members" onclick="switchTab('members')"><img src="/icons/members.png" alt="">members</button>
<button data-tab="bans" onclick="switchTab('bans')"><img src="/icons/sanctions.png" alt="">sanctions</button>
<button data-tab="messages" onclick="switchTab('messages')"><img src="/icons/messages.png" alt="">messages</button>
<button data-tab="dms" onclick="switchTab('dms')"><img src="/icons/whispers.png" alt="">whispers</button>
<button data-tab="channels" onclick="switchTab('channels')"><img src="/icons/channels2.png" alt="">channels</button>
<button data-tab="invites" onclick="switchTab('invites')"><img src="/icons/invites.png" alt="">invites</button>
<button data-tab="emojis" onclick="switchTab('emojis')"><img src="/icons/emojis.png" alt="">emojis</button>
<button data-tab="events" onclick="switchTab('events')"><img src="/icons/events.png" alt="">events</button>
<button data-tab="audit" onclick="switchTab('audit')"><img src="/icons/auditlog.png" alt="">audit log</button>
<div class="bocchi-wrap"><img src="/icons/bocchi-rotate.gif" alt=""/></div>
</div>
<button id="logoutBtn" onclick="logout()"><img src="/icons/logout.png" alt="">logout</button>
</div>
<div class="main">
<div id="loginOverlay" style="display:none;position:fixed;inset:0;background:rgba(19,22,27,.92);z-index:99;justify-content:center;align-items:center">
<div style="background:#1e2228;border:1px solid #252a32;padding:32px 28px;width:100%;max-width:300px;text-align:center;border-radius:12px">
<img src="/icons/nenchan.png" alt="nenchan" style="width:160px;height:auto;margin-bottom:4px"/>
<p style="color:#5a5260;font-size:10px;margin-bottom:20px;text-transform:uppercase;letter-spacing:1.5px">admin panel</p>
<div id="loginError" style="color:#d45555;font-size:11px;margin-bottom:8px;min-height:16px"></div>
<button onclick="loginDiscord()" style="width:100%;padding:10px 12px;background:#b48899;color:#13161b;border:none;border-radius:4px;font:600 12px 'Space Grotesk',monospace;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;transition:background .15s" onmouseover="this.style.background='#c9a0ae'" onmouseout="this.style.background='#b48899'"><img src="/icons/discord.png" alt="" style="width:18px;height:18px;filter:brightness(0)"/>Login with Discord</button>
<p style="color:#3a3340;font-size:9px;margin-top:12px">authorized users only</p>
</div>
</div>
<div id="panel-dashboard" class="panel">
<div id="dashContent"><p style="color:#6d6572">loading...</p></div>
</div>
<div id="panel-messages" class="panel">
<div class="msg-topbar">
<div class="msg-topbar-channel" id="channelPicker">
<input type="text" id="channelSearch" placeholder="#channel" oninput="filterChannels(this.value)" onfocus="showChannelList()" style="margin:0"/>
<div id="channelList" class="channel-list"></div>
</div>
<div class="msg-topbar-mention">
<input type="text" id="mentionSearch" placeholder="@mention" oninput="filterMentions(this.value)" onfocus="showMentionList()" style="margin:0"/>
<div id="mentionList" class="mention-list"></div>
</div>
</div>
<div class="msg-search-bar">
<input type="text" id="msgSearchInput" placeholder="search messages..." oninput="filterMsgHistory(this.value)"/>
</div>
<div id="msgLoadMore" class="msg-load-more" style="display:none" onclick="loadMoreMessages()">load older messages</div>
<div id="msgHistory" class="msg-history-box">
<p style="color:#5a5260;text-align:center;padding:20px 0">select a channel</p>
</div>
<div class="msg-compose">
<div class="drop-zone" id="dropZone" onclick="g('msgFile').click()" ondragover="event.preventDefault();this.classList.add('dragover')" ondragleave="this.classList.remove('dragover')" ondrop="handleDrop(event)">
<span id="dropLabel">drop file or click to attach</span>
</div>
<input type="file" id="msgFile" style="display:none" onchange="updateDropLabel(this)"/>
<div class="msg-input-row" style="align-items:flex-end">
<div class="emoji-picker-wrap">
<button onclick="toggleEmojiPicker()" style="padding:6px 8px;font-size:16px;background:none;border:none;cursor:pointer" title="emoji">&#128578;</button>
<div class="emoji-picker-dropdown" id="emojiPicker">
<input class="emoji-picker-search" id="emojiSearch" placeholder="search emoji..." oninput="filterEmojis(this.value)"/>
<div class="emoji-picker-grid" id="emojiGrid"></div>
</div>
</div>
<textarea id="msgInput" placeholder="message..." onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();sendMsg()}"></textarea>
<button onclick="sendMsg()">send</button>
</div>
<div id="msgStatus" class="msg-status"></div>
</div>
</div>
<div id="panel-members" class="panel">
<input type="text" class="member-search" id="memberSearch" placeholder="search members..." oninput="filterMembers(this.value)"/>
<div id="memberStats" class="member-stats"></div>
<div id="memberList" class="member-grid"><p style="color:#6d6572;text-align:center;padding:20px 0">loading...</p></div>
</div>
<div id="panel-dms" class="panel">
<div id="dmStart">
<p style="color:#6d6572;font-size:10px;margin-bottom:6px">enter a user id to open dm</p>
<div style="display:flex;gap:4px">
<input type="text" id="dmUserId" placeholder="user id" style="flex:1;margin:0;border-radius:6px"/>
<button onclick="startDmById()" style="margin:0;padding:4px 12px;border-radius:6px;background:#b48899;color:#13161b;font-weight:600;border:none">open</button>
</div>
</div>
<div id="dmChat" style="display:none">
<div style="display:flex;align-items:center;gap:8px;padding-bottom:8px;border-bottom:1px solid #252a32;margin-bottom:6px">
<button onclick="dmClose()" style="margin:0;padding:3px 10px;background:#252a32;color:#7d7582;border:1px solid #2e343c;border-radius:6px;font-size:11px">close</button>
<span id="dmChatName" style="color:#e0dce4;font-size:12px;font-weight:600"></span>
</div>
<div id="dmHistory" style="max-height:380px;overflow-y:auto;margin-bottom:6px;background:#191d23;border:1px solid #252a32;padding:6px;font-size:10px;line-height:1.5;border-radius:8px">
<p style="color:#5a5260;text-align:center;padding:20px 0">loading...</p>
</div>
<div class="msg-input-row">
<textarea id="dmInput" placeholder="message..." onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();sendDm()}" style="min-height:36px;resize:none;border-radius:6px"></textarea>
<button onclick="sendDm()" style="border-radius:6px;background:#b48899;color:#13161b;font-weight:600;border:none">send</button>
</div>
<div id="dmStatus" style="font-size:10px;margin-top:4px;min-height:14px"></div>
</div>
</div>
<div id="panel-bans" class="panel">
<div id="banStats" class="member-stats"></div>
<div id="banTimeouts"></div>
<div id="banBans"></div>
</div>
<div id="panel-channels" class="panel">
<div class="create-form" id="channelCreateForm">
<input type="text" id="newChannelName" placeholder="channel name"/>
<select id="newChannelType"><option value="0">Text</option><option value="2">Voice</option></select>
<select id="newChannelCategory"><option value="">no category</option></select>
<button onclick="createChannel()" style="background:#b48899;color:#13161b;border:none">create</button>
</div>
<div id="channelManageList"></div>
</div>
<div id="panel-invites" class="panel">
<div id="inviteList"></div>
</div>
<div id="panel-emojis" class="panel">
<div id="emojiContent"></div>
</div>
<div id="panel-events" class="panel">
<div class="create-form">
<input type="text" id="newEventName" placeholder="event name"/>
<input type="datetime-local" id="newEventStart"/>
<input type="datetime-local" id="newEventEnd"/>
<button onclick="createEvent()" style="background:#b48899;color:#13161b;border:none">create</button>
</div>
<div id="eventList"></div>
</div>
<div id="panel-audit" class="panel">
<div id="auditList"></div>
</div>
<div id="userModal" class="modal"><div class="modal-box" id="modalBox"></div></div>
<div id="confirmOverlay" class="confirm-overlay">
<div class="confirm-box">
<div class="confirm-title" id="confirmTitle">confirm</div>
<div class="confirm-body" id="confirmBody"></div>
<div class="confirm-footer">
<button onclick="closeConfirm()">cancel</button>
<button class="confirm-danger" id="confirmBtn" onclick="executeConfirm()">confirm</button>
</div>
</div>
</div>
<script>
function g(i){return document.getElementById(i)}
var allMembers=[],allRoles=[];

function loginDiscord(){
  api({action:"oauth_url"},function(d){
    if(d.url){window.location.href=d.url}
    else{g("loginError").textContent=d.error||"failed to start login"}
  });
}

function initPanel(){
  g("sidebar").style.display="flex";
  g("loginOverlay").style.display="none";
  g("panel-dashboard").classList.add("show");
  loadDashboard();loadMembers();loadMsgChannels();
  parseTwemoji();
}

function switchTab(name){
  document.querySelectorAll(".panel").forEach(function(e){e.classList.remove("show")});
  var el=g("panel-"+name);
  if(el)el.classList.add("show");
  document.querySelectorAll(".sidebar button").forEach(function(b){b.classList.remove("active")});
  var btn=document.querySelector(".sidebar button[data-tab='"+name+"']");
  if(btn)btn.classList.add("active");
  if(name==="messages")loadMsgChannels();
  if(name==="members")loadMembers();
  if(name==="dashboard")loadDashboard();
  if(name==="bans")loadModerations();
  if(name==="dms"){g("dmStart").style.display="block";g("dmChat").style.display="none";stopDmPoll()}
  if(name!=="dms")stopDmPoll();
  if(name==="channels")loadChannels();
  if(name==="invites")loadInvites();
  if(name==="emojis")loadEmojis();
  if(name==="events")loadEvents();
  if(name==="audit")loadAuditLog();
  if(window.innerWidth<=768&&g("sidebar").classList.contains("open"))toggleMenu();
}

function api(body,cb){
  var x=new XMLHttpRequest();
  x.open("POST","/api",true);
  x.setRequestHeader("Content-Type","application/json");
  x.onload=function(){try{var d=JSON.parse(x.responseText);cb(d)}catch(e){console.error("api error:",e,x.responseText.slice(0,300));cb({error:"api error: "+(e.message||e)})}};
  x.onerror=function(){cb({error:"connection error"})};
  x.send(JSON.stringify(body));
}

function loadDashboard(){
  api({action:"guildinfo"},function(d){
    if(d.error)return;
    var iconHtml=d.icon?"<img class='dash-icon' src='"+d.icon+"' alt=''/>":"<div class='dash-icon' style='display:flex;align-items:center;justify-content:center;color:#5a5260;font-size:22px'>"+esc(d.name.charAt(0))+"</div>";
    var rolesSorted=d.roles.slice().sort(function(a,b){return b.position-a.position});
    var hoisted=rolesSorted.filter(function(r){return r.hoist});
    var roleItems=rolesSorted.map(function(r){
      var c=r.color?"#"+r.color.toString(16).padStart(6,"0"):"#666";
      return "<div class='role-item'><span class='role-dot' style='background:"+c+"'></span>"+esc(r.name)+"</div>";
    }).join("");
    var hdrIdx=Math.floor(Math.random()*3)+1;
    var h="<div class='dash-banner' id='dashBanner' data-hdr='/icons/headers/header"+hdrIdx+".png'></div>";
    h+="<div class='dash-header'>";
    h+=iconHtml;
    h+="<div class='dash-info'><p class='dash-name'><span id='guildNameDisplay' style='cursor:pointer' onclick='editGuildName()' title='click to edit'>"+esc(d.name)+"</span> <button class='dash-edit-btn' onclick='editGuildName()' title='edit server name'>&#9998;</button></p><div class='dash-id'>"+esc(d.created)+"</div></div>";
    h+="</div>";
    h+="<div class='dash-grid'>";
    h+="<div class='dash-card'><div class='dash-card-icon'><img src='/icons/users.png' alt=''/></div><div><div class='dash-card-label'>members</div><div class='dash-card-val'>"+d.totalMembers+"</div><div class='dash-card-sub'>"+d.humans+" humans &middot; "+d.bots+" bots</div></div></div>";
    h+="<div class='dash-card'><div class='dash-card-icon'><img src='/icons/channels2.png' alt=''/></div><div><div class='dash-card-label'>channels</div><div class='dash-card-val'>"+d.channelCount+"</div><div class='dash-card-sub'>"+d.textChannels+" text &middot; "+d.voiceChannels+" voice &middot; "+d.categories+" categories</div></div></div>";
    h+="<div class='dash-card'><div class='dash-card-icon'><img src='/icons/owner.png' alt=''/></div><div><div class='dash-card-label'>owner</div><div class='dash-card-val'>"+esc(d.owner)+"</div><div class='dash-card-sub'>"+d.ownerId+"</div></div></div>";
    h+="<div class='dash-card'><div class='dash-card-icon'><img src='/icons/boost.png' alt=''/></div><div><div class='dash-card-label'>boosts</div><div class='dash-card-val'>"+d.boostCount+" boosts</div><div class='dash-card-sub'>tier "+d.boostLevel+" &middot; "+Math.max(0,14-d.boostCount)+" to next tier</div></div></div>";
    h+="</div>";
    h+="<div class='dash-roles-wrap'>";
    h+="<div class='dash-roles-header' onclick='toggleDashRoles()'><span>roles ("+d.roleCount+")</span><span class='role-arrow' id='dashRoleArrow'>&#9660;</span></div>";
    h+="<div id='dashRoleList' class='dash-roles-list'>"+roleItems+"</div>";
    h+="</div>";
    h+="<div id='dashActivity' style='background:#191d23;border:1px solid #252a32;border-radius:8px;padding:10px;margin-bottom:8px'></div>";
    g("dashContent").innerHTML=h;
    var b=g("dashBanner");if(b&&b.dataset.hdr)b.style.backgroundImage="url('"+b.dataset.hdr+"')";
    loadDashboardActivity();
  });
}

function toggleDashRoles(){g("dashRoleList").classList.toggle("show");g("dashRoleArrow").innerHTML=g("dashRoleList").classList.contains("show")?"&#9650;":"&#9660;"}

var allModData={timeouts:[],bans:[]};
function loadModerations(){
  g("banTimeouts").innerHTML="<p style='color:#6d6572;font-size:10px'>loading...</p>";
  g("banBans").innerHTML="";
  g("banStats").innerHTML="";
  api({action:"moderations"},function(d){
    if(d.error){g("banTimeouts").innerHTML="";g("banBans").innerHTML="<p style='color:#d45555;font-size:10px'>"+esc(d.error)+"</p>";return}
    var timeouts=d.timeouts||[];
    var bans=d.bans||[];
    allModData={timeouts:timeouts,bans:bans};
    g("banStats").innerHTML="<div class='member-stat'><span>timeout</span><p>"+timeouts.length+"</p></div>"+
      "<div class='member-stat'><span>banned</span><p>"+bans.length+"</p></div>"+
      "<div class='member-stat'><span>total</span><p>"+(timeouts.length+bans.length)+"</p></div>";
    renderTimeouts(timeouts);
    renderBans(bans);
  });
}

function renderTimeouts(timeouts){
  var h="<div class='mod-section'>";
  h+="<div class='mod-section-title'><span class='dot' style='background:#b48899'></span>timed out<span class='count'>"+timeouts.length+"</span></div>";
  if(!timeouts.length){
    h+="<div class='mod-empty'>no active timeouts</div>";
  }else{
    h+="<div class='mod-search'><input type='text' id='banSearchTimeout' placeholder='search timeouts...' oninput='filterTimeouts(this.value)'/></div>";
    h+="<div id='timeoutList'>";
    for(var i=0;i<timeouts.length;i++){h+=renderTimeoutCard(timeouts[i])}
    h+="</div>";
  }
  h+="</div>";
  g("banTimeouts").innerHTML=h;
}

function renderTimeoutCard(m){
  var u=m.user;
  var avatar=u.avatar?"https://cdn.discordapp.com/avatars/"+u.id+"/"+u.avatar+(u.avatar.startsWith("a_")?".gif":".png"):"https://cdn.discordapp.com/embed/avatars/"+(parseInt(u.discriminator||"0")%5)+".png";
  var name=u.global_name||u.username;
  var until=new Date(m.communication_disabled_until);
  var now=new Date();
  var remaining=until-now;
  var remStr="";
  if(remaining<=0){remStr="expired"}
  else if(remaining>86400000){remStr=Math.floor(remaining/86400000)+"d "+Math.floor((remaining%86400000)/3600000)+"h"}
  else if(remaining>3600000){remStr=Math.floor(remaining/3600000)+"h "+Math.floor((remaining%3600000)/60000)+"m"}
  else{remStr=Math.floor(remaining/60000)+"m"}
  var expiryStr=until.toLocaleString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"});
  var h="<div class='timeout-card'>";
  h+="<img src='"+avatar+"' alt='' loading='lazy'/>";
  h+="<div class='timeout-info'>";
  h+="<div class='timeout-name'>"+esc(name)+(u.bot?"<span>bot</span>":"")+"</div>";
  h+="<div class='timeout-username'>"+esc(u.username)+" &middot; "+u.id+"</div>";
  h+="<div class='timeout-detail'>";
  h+="<span class='timeout-expiry'>"+expiryStr+"</span>";
  h+="<span class='timeout-remaining'>"+remStr+"</span>";
  if(m.reason)h+="<span class='timeout-reason'>"+esc(m.reason)+"</span>";
  h+="</div></div>";
  h+="<button class='timeout-remove' data-uid='"+u.id+"' data-name='"+esc(name)+"' onclick='event.stopPropagation();removeTimeout(this)'>remove</button>";
  h+="</div>";
  return h;
}

function renderBans(bans){
  var h="<div class='mod-section'>";
  h+="<div class='mod-section-title'><span class='dot' style='background:#d45555'></span>banned<span class='count'>"+bans.length+"</span></div>";
  if(!bans.length){
    h+="<div class='mod-empty'>no banned users</div>";
  }else{
    h+="<div class='mod-search'><input type='text' id='banSearchBan' placeholder='search banned...' oninput='filterBansOnly(this.value)'/></div>";
    h+="<div id='banList'>";
    for(var i=0;i<bans.length;i++){h+=renderBanCard(bans[i])}
    h+="</div>";
  }
  h+="</div>";
  g("banBans").innerHTML=h;
}

function renderBanCard(b){
  var u=b.user;
  var avatar=u.avatar?"https://cdn.discordapp.com/avatars/"+u.id+"/"+u.avatar+(u.avatar.startsWith("a_")?".gif":".png"):"https://cdn.discordapp.com/embed/avatars/"+(parseInt(u.discriminator||"0")%5)+".png";
  var name=u.global_name||u.username;
  var h="<div class='ban-card'>";
  h+="<img src='"+avatar+"' alt='' loading='lazy'/>";
  h+="<div class='ban-info'>";
  h+="<div class='ban-name'>"+esc(name)+(u.bot?"<span>bot</span>":"")+"</div>";
  h+="<div class='ban-username'>"+esc(u.username)+" &middot; "+u.id+"</div>";
  if(b.reason)h+="<div class='ban-reason'>"+esc(b.reason)+"</div>";
  h+="</div>";
  h+="<button class='ban-unban-btn' data-uid='"+u.id+"' data-name='"+esc(name)+"' onclick='event.stopPropagation();confirmUnban(this)'>unban</button>";
  h+="</div>";
  return h;
}

function filterTimeouts(q){
  q=q.toLowerCase();
  var ft=allModData.timeouts.filter(function(m){
    var u=m.user;
    var name=(u.global_name||u.username).toLowerCase();
    return name.indexOf(q)!==-1||u.username.toLowerCase().indexOf(q)!==-1||u.id.indexOf(q)!==-1;
  });
  var list=g("timeoutList");
  if(!list)return;
  if(!ft.length){list.innerHTML="<div class='mod-empty'>no matching timeouts</div>";return}
  var h="";for(var i=0;i<ft.length;i++)h+=renderTimeoutCard(ft[i]);
  list.innerHTML=h;
}

function filterBansOnly(q){
  q=q.toLowerCase();
  var fb=allModData.bans.filter(function(b){
    var u=b.user;
    var name=(u.global_name||u.username).toLowerCase();
    return name.indexOf(q)!==-1||u.username.toLowerCase().indexOf(q)!==-1||u.id.indexOf(q)!==-1;
  });
  var list=g("banList");
  if(!list)return;
  if(!fb.length){list.innerHTML="<div class='mod-empty'>no matching bans</div>";return}
  var h="";for(var i=0;i<fb.length;i++)h+=renderBanCard(fb[i]);
  list.innerHTML=h;
}

function confirmUnban(el){
  var uid=el.dataset.uid,name=el.dataset.name;
  g("confirmTitle").textContent="unban "+name;
  g("confirmBody").innerHTML="<p style='color:#7d7582;font-size:11px'>are you sure you want to unban <b style='color:#e0dce4'>"+esc(name)+"</b>?</p>";
  var btn=g("confirmBtn");
  btn.className="confirm-danger";
  btn.textContent="unban";
  btn.onclick=function(){executeUnban(uid)};
  g("confirmOverlay").classList.add("show");
}

function executeUnban(uid){
  g("confirmOverlay").classList.remove("show");
  api({action:"unban",userId:uid},function(d){
    if(d.success){loadModerations()}
    else{alert(d.error||"failed to unban");loadModerations()}
  });
}

function removeTimeout(el){
  var uid=el.dataset.uid,name=el.dataset.name;
  g("confirmTitle").textContent="remove timeout";
  g("confirmBody").innerHTML="<p style='color:#7d7582;font-size:11px'>remove timeout for <b style='color:#e0dce4'>"+esc(name)+"</b>?</p>";
  var btn=g("confirmBtn");
  btn.className="confirm-danger";
  btn.textContent="remove";
  btn.onclick=function(){executeRemoveTimeout(uid)};
  g("confirmOverlay").classList.add("show");
}

function executeRemoveTimeout(uid){
  g("confirmOverlay").classList.remove("show");
  api({action:"timeout",userId:uid,minutes:0},function(d){
    if(d.success){loadModerations()}
    else{alert(d.error||"failed to remove timeout");loadModerations()}
  });
}

var selectedChannelId=null;
var allChannelData=[];
function loadMsgChannels(){
  api({action:"channels"},function(d){
    if(d.error){g("channelSearch").placeholder="error: "+esc(d.error);return}
    var list=g("channelList");
    list.innerHTML="";
    allChannelData=[];
    for(var i=0;i<d.channels.length;i++){
      if(d.channels[i].type===0){
        var item=document.createElement("div");
        item.className="channel-item";
        item.dataset.cid=d.channels[i].id;
        item.dataset.name=d.channels[i].name;
        item.innerHTML="<span class='ch-hash'>#</span><span class='ch-name'>"+esc(d.channels[i].name)+"</span>"+(d.channels[i].topic?"<span class='ch-topic'>"+esc(d.channels[i].topic)+"</span>":"");
        item.onclick=function(){pickChannel(this.dataset.cid,this.dataset.name)};
        list.appendChild(item);
        allChannelData.push({id:d.channels[i].id,name:d.channels[i].name,topic:d.channels[i].topic||""});
      }
    }
    api({action:"members"},function(md){
      if(md.error)return;
      var seen={};
      allMembers=[];
      for(var i=0;i<md.members.length;i++){
        var m=md.members[i];
        if(!seen[m.user.id]){seen[m.user.id]=1;allMembers.push(m)}
      }
    });
  });
}
function showChannelList(){
  var el=g("channelList");
  if(!el.children.length&&allChannelData.length){
    allChannelData.forEach(function(c){
      var item=document.createElement("div");
      item.className="channel-item";
      item.dataset.cid=c.id;
      item.dataset.name=c.name;
      item.innerHTML="<span class='ch-hash'>#</span><span class='ch-name'>"+esc(c.name)+"</span>"+(c.topic?"<span class='ch-topic'>"+esc(c.topic)+"</span>":"");
      item.onclick=function(){pickChannel(c.id,c.name)};
      el.appendChild(item);
    });
  }
  el.classList.add("show");
}
function hideChannelList(){
  setTimeout(function(){g("channelList").classList.remove("show")},150);
}
function filterChannels(q){
  q=q.toLowerCase();
  var items=g("channelList").children;
  for(var i=0;i<items.length;i++){
    var name=items[i].dataset.name||"";
    items[i].style.display=name.toLowerCase().indexOf(q)===-1?"none":"";
  }
}
function pickChannel(cid,name){
  selectedChannelId=cid;
  g("channelSearch").value="#"+name;
  g("channelList").classList.remove("show");
  g("channelSearch").focus();
  loadMsgHistory(cid);
}

var mentionVisible=false;
function showMentionList(){
  mentionVisible=true;
  var el=g("mentionList");
  if(!allMembers.length){loadMembers()}
  if(!el.children.length)filterMentions("");
  el.classList.add("show");
}
function hideMentionList(){mentionVisible=false;setTimeout(function(){g("mentionList").classList.remove("show")},150)}
function filterMentions(q){
  q=q.toLowerCase();
  var el=g("mentionList");
  var h="";
  var count=0;
  var sorted=allMembers.slice().sort(function(a,b){
    var an=(a.nick||(a.user.global_name||a.user.username)).toLowerCase();
    var bn=(b.nick||(b.user.global_name||b.user.username)).toLowerCase();
    return an.localeCompare(bn);
  });
  for(var i=0;i<sorted.length&&count<50;i++){
    var m=sorted[i],name=m.nick||(m.user.global_name||m.user.username);
    if(q&&name.toLowerCase().indexOf(q)===-1&&m.user.username.toLowerCase().indexOf(q)===-1&&m.user.id.indexOf(q)===-1)continue;
    var avatar=m.user.avatar?"https://cdn.discordapp.com/avatars/"+m.user.id+"/"+m.user.avatar+(m.user.avatar.startsWith("a_")?".gif":".png"):"https://cdn.discordapp.com/embed/avatars/"+(parseInt(m.user.discriminator||"0")%5)+".png";
    h+="<div class='mention-item' data-uid='"+m.user.id+"' data-name='"+esc(name)+"' onclick='pickMention(this)'>";
    h+="<img src='"+avatar+"' alt='' loading='lazy'/>";
    h+="<span class='m-name'>"+esc(name)+(m.user.bot?"<span class='m-bot'>bot</span>":"")+"</span>";
    h+="</div>";
    count++;
  }
  if(!count)h="<div class='mention-item' style='color:#5a5260;cursor:default'>no results</div>";
  el.innerHTML=h;
  el.classList.add("show");
}
function pickMention(el){
  var input=g("msgInput");
  input.value+="<@"+el.dataset.uid+"> ";
  input.focus();
  g("mentionSearch").value="";
  g("mentionList").classList.remove("show");
}

function sendMsg(){
  var c=selectedChannelId,m=g("msgInput").value.trim(),file=g("msgFile").files[0];
  if(!c){g("msgStatus").textContent="select a channel";g("msgStatus").style.color="#d45555";return}
  if(!m&&!file){g("msgStatus").textContent="enter a message or pick a file";g("msgStatus").style.color="#d45555";return}
  var status=g("msgStatus");
  status.style.color="#6d6572";status.textContent="sending...";
  var btn=document.querySelector(".msg-input-row button");
  if(btn)btn.disabled=true;
  var body={action:"send",channelId:c,content:m};
  if(file){
    var reader=new FileReader();
    reader.onload=function(e){
      body.fileData=e.target.result.split(",")[1];
      body.fileName=file.name;
      body.fileType=file.type;
      doSend(body,c,btn);
    };
    reader.readAsDataURL(file);
  }else{doSend(body,c,btn)}
}

function doSend(body,cid,btn){
  api(body,function(d){
    if(btn)btn.disabled=false;
    if(d.success){
      g("msgStatus").style.color="#b48899";g("msgStatus").textContent="sent!";
      g("msgInput").value="";g("msgFile").value="";updateFileLabel(g("msgFile"));
      loadMsgHistory(cid);
      setTimeout(function(){g("msgStatus").textContent=""},2000);
    }else{
      g("msgStatus").style.color="#d45555";g("msgStatus").textContent=d.error||"failed";
    }
  });
}

function deleteMsg(cid,mid){
  if(!confirm("delete this message?"))return;
  var el=document.querySelector('[data-mid="'+mid+'"]');
  if(el)el.style.opacity="0.4";
  api({action:"delete",channelId:cid,messageId:mid},function(d){
    if(d.success){loadMsgHistory(cid)}
    else{if(el)el.style.opacity="1";alert(d.error||"failed to delete")}
  });
}

function loadMembers(){
  api({action:"members"},function(d){
    if(d.error)return;
    allMembers=d.members;allRoles=d.roles;
    var humans=0,bots=0;
    for(var i=0;i<d.members.length;i++){if(d.members[i].user.bot)bots++;else humans++}
    g("memberStats").innerHTML="<div class='member-stat'><span>total</span><p>"+d.members.length+"</p></div>"+
      "<div class='member-stat'><span>humans</span><p>"+humans+"</p></div>"+
      "<div class='member-stat'><span>bots</span><p>"+bots+"</p></div>";
    renderMembers(d.members);
  });
}

function renderMembers(members){
  var sortedRoles=allRoles.slice().sort(function(a,b){return b.position-a.position});
  var hoistedRoles=sortedRoles.filter(function(r){return r.hoist});
  var groups={};
  var ungrouped=[];
  for(var i=0;i<members.length;i++){
    var m=members[i];
    var highestHoisted=null;
    for(var j=0;j<sortedRoles.length;j++){
      if(m.roles.indexOf(sortedRoles[j].id)!==-1&&sortedRoles[j].hoist){highestHoisted=sortedRoles[j];break}
    }
    if(highestHoisted){
      if(!groups[highestHoisted.id])groups[highestHoisted.id]={role:highestHoisted,members:[]};
      groups[highestHoisted.id].members.push(m);
    }else{ungrouped.push(m)}
  }
  var h="";
  for(var k=0;k<hoistedRoles.length;k++){
    var gid=hoistedRoles[k].id;
    if(!groups[gid])continue;
    var g2=groups[gid];
    var rc=g2.role.color?"#"+g2.role.color.toString(16).padStart(6,"0"):"#555";
    g2.members.sort(function(a,b){
      var an=a.nick||(a.user.global_name||a.user.username).toLowerCase();
      var bn=b.nick||(b.user.global_name||b.user.username).toLowerCase();
      return an.localeCompare(bn);
    });
    h+="<div class='role-group-header' style='color:"+rc+"'>"+esc(g2.role.name)+" <span class='role-group-count'>"+g2.members.length+"</span></div>";
    for(var i=0;i<g2.members.length;i++){h+=renderMemberCard(g2.members[i])}
  }
  if(ungrouped.length){
    ungrouped.sort(function(a,b){
      var an=a.nick||(a.user.global_name||a.user.username).toLowerCase();
      var bn=b.nick||(b.user.global_name||b.user.username).toLowerCase();
      return an.localeCompare(bn);
    });
    h+="<div class='role-group-header'>offline <span class='role-group-count'>"+ungrouped.length+"</span></div>";
    for(var i=0;i<ungrouped.length;i++){h+=renderMemberCard(ungrouped[i])}
  }
  if(!members.length)h="<p style='color:#5a5260;text-align:center;padding:20px 0'>no members found</p>";
  g("memberList").innerHTML=h;
}

function renderMemberCard(m){
  var name=m.nick||(m.user.global_name||m.user.username);
  var avatar=m.user.avatar?"https://cdn.discordapp.com/avatars/"+m.user.id+"/"+m.user.avatar+(m.user.avatar.startsWith("a_")?".gif":".png"):"https://cdn.discordapp.com/embed/avatars/"+(parseInt(m.user.discriminator||"0")%5)+".png";
  var joined=new Date(m.joined_at).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"});
  var roleBadges="";
  for(var j=0;j<m.roles.length&&j<3;j++){
    var role=allRoles.find(function(x){return x.id===m.roles[j]});
    if(role){
      var rc=role.color?"#"+role.color.toString(16).padStart(6,"0"):"#555";
      roleBadges+="<span class='role-badge' style='border-color:"+rc+"44;color:"+rc+"'>"+esc(role.name)+"</span>";
    }
  }
  if(m.roles.length>3)roleBadges+="<span class='role-badge'>+"+(m.roles.length-3)+"</span>";
  var badges="";
  if(m.premium_since)badges+="<span class='member-badge badge-boost'>boost</span>";
  var h="<div class='member-card' data-mid='"+m.user.id+"' onclick='showMember(this.dataset.mid)'>";
  h+="<img class='member-avatar' src='"+avatar+"' alt='' loading='lazy'/>";
  h+="<div class='member-info'><div class='member-name'>"+esc(name)+(m.user.bot?" <span>bot</span>":"")+"</div>";
  if(m.user.username!==name.toLowerCase()&&m.user.username!==(m.user.global_name||"").toLowerCase())h+="<div class='member-username'>"+esc(m.user.username)+"</div>";
  if(badges)h+="<div class='member-badges'>"+badges+"</div>";
  h+="<div class='member-roles'>"+(roleBadges||"<span class='role-badge'>no roles</span>")+"</div></div>";
  h+="<span class='member-joined'>"+joined+"</span>";
  h+="</div>";
  return h;
}

function filterMembers(q){
  if(!allMembers.length)return;
  q=q.toLowerCase();
  var filtered=allMembers.filter(function(m){
    var name=(m.nick||(m.user.global_name||m.user.username)).toLowerCase();
    var id=m.user.id;
    return name.indexOf(q)!==-1||id.indexOf(q)!==-1;
  });
  renderMembers(filtered);
}

function c(){g("userModal").classList.remove("show")}
function esc(s){var d=document.createElement("div");d.appendChild(document.createTextNode(s));return d.innerHTML}
function escUrl(s){return String(s).replace(/[^a-zA-Z0-9-._~:/?#@[!$&'()*+,;=%]/g,encodeURIComponent)}
function fmt(s){
  var r=esc(s);
  r=r.replace(new RegExp("&lt;:([^:]+):(\\\\d+)&gt;","g"),"<img src='https://cdn.discordapp.com/emojis/$2.png' style='width:18px;height:18px;vertical-align:middle' alt=':$1:'>");
  r=r.replace(new RegExp("&lt;a:([^:]+):(\\\\d+)&gt;","g"),"<img src='https://cdn.discordapp.com/emojis/$2.gif' style='width:18px;height:18px;vertical-align:middle' alt=':$1:'>");
  r=r.replace(new RegExp("\\\\|\\\\|([^|]+)\\\\|\\\\|","g"),"<span class='spoiler' onclick='this.classList.toggle(&quot;revealed&quot;)'>$1</span>");
  r=r.replace(new RegExp("\\\\*\\\\*(.+?)\\\\*\\\\*","g"),"<b>$1</b>");
  r=r.replace(new RegExp("\\\\*(.+?)\\\\*","g"),"<i>$1</i>");
  r=r.replace(new RegExp("__(.+?)__","g"),"<u>$1</u>");
  r=r.replace(new RegExp("~~(.+?)~~","g"),"<s>$1</s>");
  r=r.replace(new RegExp("\`\`\`([\\\\s\\\\S]+?)\`\`\`","g"),"<pre><code>$1</code></pre>");
  r=r.replace(new RegExp("\`([^\`]+)\`","g"),"<code>$1</code>");
  r=r.replace(new RegExp("&lt;@(\\\\d+)&gt;","g"),"<span class='mention'>@$1</span>");
  return r;
}
function logout(){fetch("/api",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"logout"})}).finally(function(){location.reload()})}
function updateFileLabel(el){
  var label=g("dropLabel");
  if(el.files&&el.files.length){label.textContent=el.files[0].name;g("dropZone").classList.add("has-file")}
  else{label.textContent="drop file or click to attach";g("dropZone").classList.remove("has-file")}
}
function updateDropLabel(el){updateFileLabel(el)}
function handleDrop(e){
  e.preventDefault();
  var dz=g("dropZone");dz.classList.remove("dragover");
  var files=e.dataTransfer.files;
  if(files.length){g("msgFile").files=files;updateFileLabel(g("msgFile"))}
}
function toggleMenu(){g("sidebar").classList.toggle("open");g("menuOverlay").classList.toggle("show")}

// --- Toast notifications ---
function showToast(msg,type){
  var t=document.createElement("div");
  t.className="toast toast-"+(type||"success");
  t.textContent=msg;
  document.body.appendChild(t);
  setTimeout(function(){t.style.opacity="0";t.style.transition="opacity .3s";setTimeout(function(){t.remove()},300)},3000);
}

// --- Message editing ---
var editingMsgId=null;
function editMsg(cid,mid){
  var row=document.querySelector('[data-mid="'+mid+'"]');
  if(!row)return;
  var content=row.querySelector(".msg-content");
  if(!content)return;
  var oldText=content.textContent||"";
  editingMsgId=mid;
  var area=document.createElement("div");
  area.className="msg-edit-area";
  area.innerHTML="<textarea id='editTextarea'>"+esc(oldText)+"</textarea><div class='msg-edit-actions'><button class='msg-edit-save' onclick='saveEdit(&quot;"+cid+"&quot;,&quot;"+mid+"&quot;)'>save</button><button class='msg-edit-cancel' onclick='cancelEdit()'>cancel</button></div>";
  content.style.display="none";
  content.parentNode.insertBefore(area,content.nextSibling);
  var ta=g("editTextarea");if(ta){ta.focus();ta.selectionStart=ta.value.length}
}
function saveEdit(cid,mid){
  var ta=g("editTextarea");
  if(!ta)return;
  var newContent=ta.value.trim();
  if(!newContent){showToast("message cannot be empty","error");return}
  api({action:"edit",channelId:cid,messageId:mid,content:newContent},function(d){
    if(d.success){showToast("message edited");cancelEdit();loadMsgHistory(cid)}
    else{showToast(d.error||"failed to edit","error")}
  });
}
function cancelEdit(){
  var area=g("editTextarea");
  if(area&&area.parentNode)area.parentNode.remove();
  var rows=document.querySelectorAll(".msg-content");
  rows.forEach(function(r){r.style.display=""});
  editingMsgId=null;
}

// --- Message search (client-side filter) ---
function filterMsgHistory(q){
  q=q.toLowerCase();
  var rows=document.querySelectorAll("#msgHistory .msg-row");
  rows.forEach(function(r){
    var content=r.querySelector(".msg-content");
    var author=r.querySelector(".msg-author");
    var text=(content?content.textContent:"")+(author?author.textContent:"");
    if(!q||text.toLowerCase().indexOf(q)!==-1){r.style.display=""}
    else{r.style.display="none"}
  });
}

// --- Message pagination ---
var msgPagination={before:null,channelId:null,loading:false};
function loadMsgHistory(cid){
  if(!cid){g("msgHistory").innerHTML="<p style='color:#5a5260;text-align:center;padding:20px 0'>select a channel</p>";g("msgLoadMore").style.display="none";return}
  g("msgHistory").innerHTML="<p style='color:#6d6572;text-align:center;padding:20px 0'>loading...</p>";
  g("msgLoadMore").style.display="none";
  msgPagination={before:null,channelId:cid,loading:false};
  g("msgSearchInput").value="";
  api({action:"messages",channelId:cid,limit:50},function(d){
    if(d.error){g("msgHistory").innerHTML="<p style='color:#d45555;text-align:center;padding:20px 0'>"+esc(d.error)+"</p>";return}
    if(!d.messages||!d.messages.length){g("msgHistory").innerHTML="<p style='color:#5a5260;text-align:center;padding:20px 0'>no messages found.</p>";return}
    if(!Array.isArray(d.messages)){g("msgHistory").innerHTML="<p style='color:#d45555;text-align:center;padding:20px 0'>invalid response</p>";return}
    if(d.messages.length>=50){g("msgLoadMore").style.display="block";msgPagination.before=d.messages[d.messages.length-1].id}
    renderMsgHistory(d.messages,cid);
  });
}
function loadMoreMessages(){
  if(msgPagination.loading||!msgPagination.before||!msgPagination.channelId)return;
  msgPagination.loading=true;
  g("msgLoadMore").textContent="loading...";
  api({action:"messages",channelId:msgPagination.channelId,limit:50,before:msgPagination.before},function(d){
    msgPagination.loading=false;
    g("msgLoadMore").textContent="load older messages";
    if(d.error||!d.messages||!d.messages.length){g("msgLoadMore").style.display="none";return}
    var existing=g("msgHistory");
    var newHtml="";
    if(d.messages.length>=50){msgPagination.before=d.messages[d.messages.length-1].id;g("msgLoadMore").style.display="block"}
    else{g("msgLoadMore").style.display="none";msgPagination.before=null}
    var tmp=document.createElement("div");
    tmp.innerHTML=renderMsgRows(d.messages,msgPagination.channelId);
    var first=existing.querySelector(".msg-day-divider");
    if(first)existing.insertBefore(tmp,first);
    else existing.innerHTML=tmp.innerHTML+existing.innerHTML;
    parseTwemoji(existing);
  });
}
function renderMsgRows(messages,cid){
  var h="";var prevDate="";var prevAuthor=null;var prevTime=0;
  for(var i=messages.length-1;i>=0;i--){
    var msg=messages[i],u=msg.author;
    if(!u)continue;
    var ts=new Date(msg.timestamp);
    var dayStr=ts.toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"});
    var timeStr=ts.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"});
    var tsVal=ts.getTime();
    if(dayStr!==prevDate){h+="<div class='msg-day-divider'><span>"+dayStr+"</span></div>";prevDate=dayStr;prevAuthor=null}
    var sameUser=prevAuthor&&prevAuthor===u.id;
    var sameGroup=sameUser&&(tsVal-prevTime)<420000;
    var name=u.global_name||u.username;
    var avatar=u.avatar?"https://cdn.discordapp.com/avatars/"+u.id+"/"+u.avatar+(u.avatar.startsWith("a_")?".gif":".png"):"https://cdn.discordapp.com/embed/avatars/"+(parseInt(u.discriminator||"0")%5)+".png";
    h+="<div class='msg-row"+(sameGroup?" msg-group-start":"")+"'>";
    if(sameGroup){h+="<div class='msg-avatar' style='visibility:hidden;width:34px'></div>"}
    else{h+="<img class='msg-avatar' src='"+avatar+"' alt='' loading='lazy'/>"}
    h+="<div class='msg-body'>";
    if(!sameGroup){h+="<div><span class='msg-author'>"+esc(name)+"</span>"+(u.bot?"<span style='font-size:8px;background:#b48899;color:#13161b;padding:1px 4px;border-radius:3px;margin-left:5px;font-weight:700;text-transform:uppercase;vertical-align:middle'>bot</span>":"")+"<span class='msg-time'>"+timeStr+"</span>"+(msg.edited_timestamp?"<span class='msg-edited'>(edited)</span>":"")+"</div>"}
    else{h+="<div class='msg-time-inline'>"+timeStr+"</div>"}
    if(msg.referenced_message&&msg.referenced_message.author){
      var ru=msg.referenced_message.author,rn=ru.global_name||ru.username;
      var ra=ru.avatar?"https://cdn.discordapp.com/avatars/"+ru.id+"/"+ru.avatar+(ru.avatar.startsWith("a_")?".gif":".png"):"https://cdn.discordapp.com/embed/avatars/"+(parseInt(ru.discriminator||"0")%5)+".png";
      h+="<div class='msg-ref'><img src='"+ra+"' style='width:14px;height:14px;border-radius:50%;vertical-align:middle' alt=''/> <b>"+esc(rn)+"</b> "+fmt(msg.referenced_message.content||"(attachment)").substring(0,120)+"</div>";
    }
    h+="<div class='msg-content'>"+fmt(msg.content||"")+"</div>";
    if(msg.sticker_items&&msg.sticker_items.length){
      for(var j=0;j<msg.sticker_items.length;j++){
        var s=msg.sticker_items[j];
        h+="<img class='msg-sticker' src='https://cdn.discordapp.com/stickers/"+s.id+".png' alt='' loading='lazy'/>";
      }
    }
    if(msg.attachments&&msg.attachments.length){
      for(var j=0;j<msg.attachments.length;j++){
        var a=msg.attachments[j];
        if(a.content_type&&(a.content_type.startsWith("image/")||a.width)){
          h+="<img class='msg-img' src='"+escUrl(a.url)+"' alt='' loading='lazy'/>";
        }else if(a.content_type&&a.content_type.startsWith("video/")){
          h+="<video class='msg-video' src='"+escUrl(a.url)+"' controls></video>";
        }else if(a.content_type&&a.content_type.startsWith("audio/")){
          h+="<audio class='msg-audio' src='"+escUrl(a.url)+"' controls></audio>";
        }else{
          h+="<a class='msg-file-link' href='"+escUrl(a.url)+"'>&#128206; "+esc(a.filename)+"</a>";
        }
      }
    }
    if(msg.embeds&&msg.embeds.length){
      for(var j=0;j<msg.embeds.length;j++){
        var e=msg.embeds[j];
        if(e.type=="image"&&e.thumbnail&&e.thumbnail.url){h+="<img class='msg-img' src='"+escUrl(e.thumbnail.url)+"' alt='' loading='lazy'/>";continue}
        var bg=e.color?"#"+("000000"+e.color.toString(16)).slice(-6):"";
        h+="<div class='msg-embed'"+(bg?" style='border-left-color:"+bg+"'":"")+">";
        if(e.author&&e.author.name)h+="<div class='msg-embed-author'>"+esc(e.author.name)+"</div>";
        if(e.title){if(e.url)h+="<a class='msg-embed-title' href='"+escUrl(e.url)+"' style='text-decoration:none'>"+esc(e.title)+"</a>";else h+="<div class='msg-embed-title'>"+esc(e.title)+"</div>"}
        if(e.description)h+="<div class='msg-embed-desc'>"+fmt(e.description||"")+"</div>";
        if(e.fields&&e.fields.length){for(var k=0;k<e.fields.length;k++){var f=e.fields[k];h+="<div><div class='msg-embed-field-name'>"+esc(f.name)+"</div><div class='msg-embed-field-val'>"+fmt(f.value||"")+"</div></div>"}}
        if(e.image&&e.image.url)h+="<img class='msg-img' src='"+escUrl(e.image.url)+"' alt='' loading='lazy'/>";
        if(e.thumbnail&&e.thumbnail.url&&!(e.type=="image"))h+="<img class='msg-img' src='"+escUrl(e.thumbnail.url)+"' alt='' loading='lazy' style='max-width:80px;max-height:80px;float:right;margin:2px'/>";
        if(e.footer&&e.footer.text)h+="<div style='color:#5a5260;font-size:8px;margin-top:3px'>"+esc(e.footer.text)+"</div>";
        h+="</div>";
      }
    }
    if(msg.reactions&&msg.reactions.length){
      h+="<div class='msg-reactions'>";
      for(var j=0;j<msg.reactions.length;j++){
        var r=msg.reactions[j],emo=r.emoji;
        if(emo.id){h+="<span class='msg-reaction'><img src='https://cdn.discordapp.com/emojis/"+emo.id+".png' style='width:14px;height:14px' alt=''/> <span class='msg-reaction-count'>"+r.count+"</span></span>"}
        else{h+="<span class='msg-reaction'>"+esc(emo.name)+" <span class='msg-reaction-count'>"+r.count+"</span></span>"}
      }
      h+="</div>";
    }
    h+="</div>";
    h+="<span class='msg-edit-btn' data-cid='"+cid+"' data-mid='"+msg.id+"' onclick='editMsg(this.dataset.cid,this.dataset.mid)' title='edit'>&#9998;</span>";
    h+="<span class='msg-del' data-cid='"+cid+"' data-mid='"+msg.id+"' onclick='deleteMsg(this.dataset.cid,this.dataset.mid)' title='delete'>&#10005;</span>";
    h+="</div>";
    prevAuthor=u.id;prevTime=tsVal;
  }
  return h;
}
function renderMsgHistory(messages,cid){
  g("msgHistory").innerHTML=renderMsgRows(messages,cid);
  parseTwemoji(g("msgHistory"));
  g("msgHistory").scrollTop=g("msgHistory").scrollHeight;
}

// --- Emoji picker (Discord/Twemoji) ---
var allEmojis=["\u{1F600}","\u{1F603}","\u{1F604}","\u{1F601}","\u{1F606}","\u{1F605}","\u{1F923}","\u{1F602}","\u{1F642}","\u{1F643}","\u{1F609}","\u{1F60A}","\u{1F607}","\u{1F970}","\u{1F60D}","\u{1F929}","\u{1F618}","\u{1F617}","\u{1F61A}","\u{1F619}","\u{1F972}","\u{1F60B}","\u{1F61B}","\u{1F61C}","\u{1F92A}","\u{1F61D}","\u{1F911}","\u{1F917}","\u{1F92D}","\u{1FAE2}","\u{1FAE3}","\u{1F92B}","\u{1F914}","\u{1FAE1}","\u{1F910}","\u{1F928}","\u{1F610}","\u{1F611}","\u{1F636}","\u{1FAE5}","\u{1F60F}","\u{1F612}","\u{1F644}","\u{1F62C}","\u{1F925}","\u{1F60C}","\u{1F614}","\u{1F62A}","\u{1F924}","\u{1F634}","\u{1F637}","\u{1F912}","\u{1F915}","\u{1F922}","\u{1F92E}","\u{1F975}","\u{1F976}","\u{1F974}","\u{1F635}","\u{1F92F}","\u{1F973}","\u{1F978}","\u{1F60E}","\u{1F913}","\u{1F9D0}","\u{1F615}","\u{1FAE4}","\u{1F61F}","\u{1F641}","\u{1F62E}","\u{1F62F}","\u{1F632}","\u{1F633}","\u{1F97A}","\u{1F979}","\u{1F626}","\u{1F627}","\u{1F628}","\u{1F630}","\u{1F625}","\u{1F622}","\u{1F62D}","\u{1F631}","\u{1F616}","\u{1F623}","\u{1F61E}","\u{1F613}","\u{1F629}","\u{1F62B}","\u{1F971}","\u{1F624}","\u{1F621}","\u{1F620}","\u{1F92C}","\u{1F608}","\u{1F47F}","\u{1F480}","\u2620\uFE0F","\u{1F4A9}","\u{1F921}","\u{1F479}","\u{1F47A}","\u{1F47B}","\u{1F47D}","\u{1F47E}","\u{1F916}","\u{1F63A}","\u{1F638}","\u{1F639}","\u{1F63B}","\u{1F63C}","\u{1F63D}","\u{1F640}","\u{1F63F}","\u{1F63E}","\u{1FAF6}","\u{1F450}","\u{1F932}","\u{1F91D}","\u{1F64F}","\u270C\uFE0F","\u{1F91E}","\u{1FAF0}","\u{1F91F}","\u{1F918}","\u{1F44C}","\u{1F90C}","\u{1F90F}","\u{1F448}","\u{1F449}","\u{1F446}","\u{1F595}","\u{1F447}","\u261D\uFE0F","\u{1FAF5}","\u{1F44D}","\u{1F44E}","\u270A","\u{1F44A}","\u{1F91B}","\u{1F91C}","\u{1F44F}","\u{1F64C}","\u{1F4AA}","\u{1F9BE}","\u{1F590}\uFE0F","\u270B","\u{1F596}","\u{1FAF1}","\u{1FAF2}","\u{1FAF3}","\u{1FAF4}","\u{1F44C}","\u{1F90C}","\u{1F90F}","\u270C\uFE0F","\u{1F91E}","\u{1FAF0}","\u{1F91F}","\u{1F918}","\u{1F919}","\u{1F448}","\u{1F449}","\u{1F446}","\u{1F595}","\u{1F447}","\u261D\uFE0F","\u{1FAF5}","\u{1F44D}","\u{1F44E}","\u270A","\u{1F44A}","\u{1F91B}","\u{1F91C}","\u{1F44F}","\u{1F64C}","\u{1F450}","\u{1F932}","\u{1F91D}","\u{1F64F}","\u270D\uFE0F","\u{1F485}","\u{1F933}","\u{1F4AA}","\u{1F9BE}","\u{1F9BF}","\u{1F9B5}","\u{1F9B6}","\u{1F442}","\u{1F9BB}","\u{1F443}","\u{1F9E0}","\u{1FAC0}","\u{1FAC1}","\u{1F9B7}","\u{1F9B4}","\u{1F440}","\u{1F441}\uFE0F","\u{1F445}","\u{1F444}","\u{1FAE6}","\u{1F48B}","\u{1F436}","\u{1F431}","\u{1F42D}","\u{1F439}","\u{1F430}","\u{1F98A}","\u{1F43B}","\u{1F43C}","\u{1F428}","\u{1F42F}","\u{1F981}","\u{1F42E}","\u{1F437}","\u{1F438}","\u{1F435}","\u{1F648}","\u{1F649}","\u{1F64A}","\u{1F412}","\u{1F414}","\u{1F427}","\u{1F426}","\u{1F424}","\u{1F423}","\u{1F425}","\u{1F986}","\u{1F985}","\u{1F989}","\u{1F987}","\u{1F43A}","\u{1F417}","\u{1F434}","\u{1F984}","\u{1F41D}","\u{1FAB1}","\u{1F41B}","\u{1F98B}","\u{1F40C}","\u{1F41E}","\u{1F41C}","\u{1FAB0}","\u{1FAB2}","\u{1FAB3}","\u{1F99F}","\u{1F997}","\u{1F577}\uFE0F","\u{1F578}\uFE0F","\u{1F982}","\u{1F422}","\u{1F40D}","\u{1F98E}","\u{1F996}","\u{1F995}","\u{1F419}","\u{1F991}","\u{1F990}","\u{1F99E}","\u{1F980}","\u{1F421}","\u{1F420}","\u{1F41F}","\u{1F42C}","\u{1F433}","\u{1F40B}","\u{1F988}","\u{1F9AD}","\u{1F40A}","\u{1F405}","\u{1F406}","\u{1F993}","\u{1F98D}","\u{1F9A7}","\u{1F418}","\u{1F9A3}","\u{1F99B}","\u{1F98F}","\u{1F42A}","\u{1F42B}","\u{1F992}","\u{1F998}","\u{1F9AC}","\u{1F403}","\u{1F402}","\u{1F404}","\u{1F40E}","\u{1F416}","\u{1F40F}","\u{1F411}","\u{1F999}","\u{1F410}","\u{1F98C}","\u{1F415}","\u{1F429}","\u{1F9AE}","\u{1F415}\u200D\u{1F9BA}","\u{1F408}","\u{1F408}\u200D\u2B1B","\u{1FAB6}","\u{1F413}","\u{1F983}","\u{1F9A4}","\u{1F99A}","\u{1F99C}","\u{1F9A2}","\u{1F9A9}","\u{1F54A}\uFE0F","\u{1F407}","\u{1F99D}","\u{1F9A8}","\u{1F9A1}","\u{1F9AB}","\u{1F9A6}","\u{1F9A5}","\u{1F401}","\u{1F400}","\u{1F43F}\uFE0F","\u{1F994}","\u{1F43E}","\u{1F409}","\u{1F432}","\u{1F335}","\u{1F384}","\u{1F332}","\u{1F333}","\u{1F334}","\u{1FAB5}","\u{1F331}","\u{1F33F}","\u2618\uFE0F","\u{1F340}","\u{1F38D}","\u{1FAB4}","\u{1F38B}","\u{1F343}","\u{1F342}","\u{1F341}","\u{1FABA}","\u{1FAB9}","\u{1F344}","\u{1F41A}","\u{1FAB8}","\u{1FAA8}","\u{1F30A}","\u{1FAE7}","\u{1F525}","\u{1F32A}\uFE0F","\u{1F308}","\u{1F34F}","\u{1F34E}","\u{1F350}","\u{1F34A}","\u{1F34B}","\u{1F34C}","\u{1F349}","\u{1F347}","\u{1F353}","\u{1FAD0}","\u{1F348}","\u{1F352}","\u{1F351}","\u{1F96D}","\u{1F34D}","\u{1F965}","\u{1F95D}","\u{1F345}","\u{1F346}","\u{1F951}","\u{1F966}","\u{1F96C}","\u{1F952}","\u{1F336}\uFE0F","\u{1FAD1}","\u{1F33D}","\u{1F955}","\u{1FAD2}","\u{1F9C4}","\u{1F9C5}","\u{1F954}","\u{1F360}","\u{1FAD8}","\u{1F950}","\u{1F35E}","\u{1F956}","\u{1F968}","\u{1F9C0}","\u{1F95A}","\u{1F373}","\u{1F9C8}","\u{1F95E}","\u{1F9C7}","\u{1F953}","\u{1F969}","\u{1F357}","\u{1F356}","\u{1F9B4}","\u{1F32D}","\u{1F354}","\u{1F35F}","\u{1F355}","\u{1FAD3}","\u{1F96A}","\u{1F959}","\u{1F9C6}","\u{1F32E}","\u{1F32F}","\u{1FAD4}","\u{1F957}","\u{1F958}","\u{1FAD5}","\u{1F96B}","\u{1F35D}","\u{1F35C}","\u{1F372}","\u{1F35B}","\u{1F363}","\u{1F371}","\u{1F95F}","\u{1F9AA}","\u{1F364}","\u{1F359}","\u{1F35A}","\u{1F358}","\u{1F365}","\u{1F96E}","\u{1F362}","\u{1F361}","\u{1F367}","\u{1F368}","\u{1F366}","\u{1F967}","\u{1F9C1}","\u{1F370}","\u{1F382}","\u{1F36E}","\u{1F36D}","\u{1F36C}","\u{1F36B}","\u{1F37F}","\u{1F369}","\u{1F36A}","\u{1F330}","\u{1F95C}","\u{1F36F}","\u{1F95B}","\u{1F37C}","\u{1FAD6}","\u2615","\u{1F375}","\u{1F9C3}","\u{1F964}","\u{1F9CB}","\u{1F376}","\u{1F37A}","\u{1F37B}","\u{1F942}","\u{1F377}","\u{1F943}","\u{1F378}","\u{1F379}","\u{1F9C9}","\u{1F37E}","\u{1F9CA}","\u{1F944}","\u{1F374}","\u{1F37D}\uFE0F","\u{1F963}","\u{1F961}","\u{1F962}","\u{1F9C2}","\u{1F697}","\u{1F695}","\u{1F699}","\u{1F68C}","\u{1F68E}","\u{1F3CE}\uFE0F","\u{1F693}","\u{1F691}","\u{1F692}","\u{1F690}","\u{1F6FB}","\u{1F69A}","\u{1F69B}","\u{1F69C}","\u{1F3CD}\uFE0F","\u{1F6F5}","\u{1F6B2}","\u{1F6F4}","\u{1F6FA}","\u{1F68D}","\u{1F698}","\u{1F696}","\u{1F6DE}","\u{1F6A1}","\u{1F6A0}","\u{1F69F}","\u{1F683}","\u{1F68B}","\u{1F69E}","\u{1F69D}","\u{1F684}","\u{1F685}","\u{1F688}","\u{1F682}","\u{1F686}","\u{1F687}","\u{1F68A}","\u{1F689}","\u2708\uFE0F","\u{1F6EB}","\u{1F6EC}","\u{1F6E9}\uFE0F","\u{1F4BA}","\u{1F6F0}\uFE0F","\u{1F680}","\u{1F6F8}","\u{1F681}","\u{1F6F6}","\u26F5","\u{1F6A4}","\u{1F6E5}\uFE0F","\u{1F6F3}\uFE0F","\u26F4\uFE0F","\u{1F6A2}","\u{1F5FC}","\u{1F3F0}","\u{1F3EF}","\u{1F3DF}\uFE0F","\u{1F3A1}","\u{1F3A2}","\u{1F3A0}","\u26F2","\u26F1\uFE0F","\u{1F3D6}\uFE0F","\u{1F3DD}\uFE0F","\u{1F3DC}\uFE0F","\u{1F30B}","\u26F0\uFE0F","\u{1F3D4}\uFE0F","\u{1F5FB}","\u{1F3D5}\uFE0F","\u{1F6D6}","\u{1F3E0}","\u{1F3E1}","\u{1F3D8}\uFE0F","\u{1F3DA}\uFE0F","\u{1F3D7}\uFE0F","\u{1F3ED}","\u{1F3E2}","\u{1F3EC}","\u{1F3E3}","\u{1F3E4}","\u{1F3E5}","\u{1F3E6}","\u{1F3E8}","\u{1F3EA}","\u{1F3EB}","\u{1F3E9}","\u{1F492}","\u{1F3DB}\uFE0F","\u26EA","\u{1F54C}","\u{1F6D5}","\u{1F54D}","\u26E9\uFE0F","\u{1F54B}","\u26F2","\u26FA","\u{1F301}","\u{1F303}","\u{1F3D9}\uFE0F","\u{1F304}","\u{1F305}","\u{1F306}","\u{1F307}","\u{1F309}","\u{1F30C}","\u{1F3A0}","\u{1F6DD}","\u{1F3A1}","\u{1F3A2}","\u{1F682}","\u{1F683}","\u{1F3A2}","\u{1F3AA}","\u{1F58C}\uFE0F","\u{1F3A8}","\u{1F3AC}","\u{1F3A4}","\u{1F3A7}","\u{1F3BC}","\u{1F3B9}","\u{1F941}","\u{1FA98}","\u{1F3B7}","\u{1F3BA}","\u{1FA97}","\u{1F3B8}","\u{1FA95}","\u{1F3BB}","\u{1F3B2}","\u265F\uFE0F","\u{1F3AF}","\u{1F3B3}","\u{1F3AE}","\u{1F3B0}","\u{1F9E9}","\u26BD","\u{1F3C0}","\u{1F3C8}","\u26BE","\u{1F94E}","\u{1F3BE}","\u{1F3D0}","\u{1F3C9}","\u{1F94F}","\u{1F3B1}","\u{1FA80}","\u{1F3D3}","\u{1F3F8}","\u{1F3D2}","\u{1F94D}","\u{1F3CF}","\u{1FA83}","\u{1F945}","\u26F3","\u{1FA81}","\u{1F3F9}","\u{1F3A3}","\u{1F93F}","\u{1F94A}","\u{1F94B}","\u{1F3BD}","\u{1F6F9}","\u{1F6FC}","\u{1F6F7}","\u26F8\uFE0F","\u{1F94C}","\u{1F3BF}","\u{1F3AF}","\u{1FA80}","\u{1FA81}","\u{1F3AE}","\u{1F579}\uFE0F","\u{1F3B0}","\u{1F9E9}","\u{1F3AA}","\u{1F3A8}","\u{1F3AC}","\u{1F3A4}","\u{1F3A7}","\u{1F3BC}","\u{1F3B9}","\u{1F941}","\u{1FA98}","\u{1F3B7}","\u{1F3BA}","\u{1FA97}","\u{1F3B8}","\u{1FA95}","\u{1F3BB}","\u{1F3B2}","\u265F\uFE0F","\u{1F3AD}","\u{1FA85}","\u{1FAA9}","\u{1FA86}","\u{1F0CF}","\u{1F004}","\u{1F3B4}","\u{1F4EF}","\u231A","\u{1F4F1}","\u{1F4F2}","\u{1F4BB}","\u2328\uFE0F","\u{1F5A5}\uFE0F","\u{1F5A8}\uFE0F","\u{1F5B1}\uFE0F","\u{1F5B2}\uFE0F","\u{1F579}\uFE0F","\u{1F5DC}\uFE0F","\u{1F4BD}","\u{1F4BE}","\u{1F4BF}","\u{1F4C0}","\u{1F4FC}","\u{1F4F7}","\u{1F4F8}","\u{1F4F9}","\u{1F3A5}","\u{1F4FD}\uFE0F","\u{1F39E}\uFE0F","\u{1F4DE}","\u260E\uFE0F","\u{1F4DF}","\u{1F4E0}","\u{1F4FA}","\u{1F4FB}","\u{1F399}\uFE0F","\u{1F39A}\uFE0F","\u{1F39B}\uFE0F","\u{1F9ED}","\u23F1\uFE0F","\u23F2\uFE0F","\u23F0","\u{1F570}\uFE0F","\u231B","\u23F3","\u{1F4E1}","\u{1F50B}","\u{1FAAB}","\u{1F50C}","\u{1F4A1}","\u{1F526}","\u{1F56F}\uFE0F","\u{1FA94}","\u{1F9EF}","\u{1F6E2}\uFE0F","\u{1F4B8}","\u{1F4B5}","\u{1F4B4}","\u{1F4B6}","\u{1F4B7}","\u{1FA99}","\u{1F4B0}","\u{1F4B3}","\u{1FAAA}","\u{1F9FE}","\u{1F4E7}","\u{1F4E8}","\u{1F4E9}","\u{1F4E4}","\u{1F4E5}","\u{1F4E6}","\u{1F3F7}\uFE0F","\u{1FAA7}","\u{1F4EA}","\u{1F4EB}","\u{1F4EC}","\u{1F4ED}","\u{1F4EE}","\u{1F4ED}","\u{1F4DC}","\u{1F4C3}","\u{1F4C4}","\u{1F4D1}","\u{1F4CA}","\u{1F4C8}","\u{1F4C9}","\u{1F5D2}\uFE0F","\u{1F5D3}\uFE0F","\u{1F4C6}","\u{1F4C5}","\u{1F5D1}\uFE0F","\u{1F4C2}","\u{1F4C1}","\u{1F5C2}\uFE0F","\u{1F5DE}\uFE0F","\u{1F4F0}","\u{1F4D3}","\u{1F4D4}","\u{1F4D2}","\u{1F4D5}","\u{1F4D6}","\u{1F4D7}","\u{1F4D8}","\u{1F4D9}","\u{1F4DA}","\u{1F52C}","\u{1F52D}","\u{1F489}","\u{1FA78}","\u{1F48A}","\u{1FA79}","\u{1FA7C}","\u{1FA7B}","\u{1FA7A}","\u{1F6AA}","\u{1F6D7}","\u{1FA9E}","\u{1FA9F}","\u{1F6CF}\uFE0F","\u{1F6CB}\uFE0F","\u{1FA91}","\u{1F6BD}","\u{1FAA0}","\u{1F6BF}","\u{1F6C1}","\u{1FAA4}","\u{1FA92}","\u{1F9F4}","\u{1F9F7}","\u{1F9F9}","\u{1F9FA}","\u{1F9FB}","\u{1FAA3}","\u{1F9FC}","\u{1FAA5}","\u{1F9FD}","\u{1F9EF}","\u{1F6D2}","\u{1F6AC}","\u26B0\uFE0F","\u{1FAA6}","\u26B1\uFE0F","\u{1F5FF}","\u{1F9F8}","\u{1FA86}","\u{1FA85}","\u{1FAA9}","\u{1FA98}","\u{1FA97}","\u{1FA95}","\u{1FA94}","\u2764\uFE0F","\u{1F9E1}","\u{1F49B}","\u{1F49A}","\u{1F499}","\u{1F49C}","\u{1F5A4}","\u{1F90D}","\u{1F90E}","\u{1F494}","\u2763\uFE0F","\u{1F495}","\u{1F49E}","\u{1F493}","\u{1F497}","\u{1F496}","\u{1F498}","\u{1F49D}","\u{1F49F}","\u262E\uFE0F","\u271D\uFE0F","\u262A\uFE0F","\u{1F549}\uFE0F","\u2638\uFE0F","\u2721\uFE0F","\u{1F52F}","\u{1F54E}","\u262F\uFE0F","\u2626\uFE0F","\u{1F6D0}","\u26CE","\u2648","\u2649","\u264A","\u264B","\u264C","\u264D","\u264E","\u264F","\u2650","\u2651","\u2652","\u2653","\u{1F194}","\u269B\uFE0F","\u{1F251}","\u2622\uFE0F","\u2623\uFE0F","\u{1F4F4}","\u{1F4F3}","\u{1F236}","\u{1F21A}","\u{1F238}","\u{1F23A}","\u{1F237}\uFE0F","\u2734\uFE0F","\u{1F19A}","\u{1F4AE}","\u{1F250}","\u3299\uFE0F","\u3297\uFE0F","\u{1F234}","\u{1F235}","\u{1F239}","\u{1F232}","\u{1F170}\uFE0F","\u{1F171}\uFE0F","\u{1F18E}","\u{1F191}","\u{1F17E}\uFE0F","\u{1F198}","\u274C","\u2B55","\u{1F6D1}","\u26D4","\u{1F4DB}","\u{1F6AB}","\u{1F4AF}","\u{1F4A2}","\u2668\uFE0F","\u{1F6B7}","\u{1F6AF}","\u{1F6B3}","\u{1F6B1}","\u{1F51E}","\u{1F4F5}","\u{1F6AD}","\u2757","\u2755","\u2753","\u2754","\u203C\uFE0F","\u2049\uFE0F","\u{1F505}","\u{1F506}","\u303D\uFE0F","\u26A0\uFE0F","\u{1F6B8}","\u{1F531}","\u269C\uFE0F","\u{1F530}","\u267B\uFE0F","\u2705","\u{1F22F}","\u{1F4B9}","\u2747\uFE0F","\u2733\uFE0F","\u274E","\u{1F310}","\u{1F4A0}","\u24C2\uFE0F","\u{1F300}","\u{1F4A4}","\u{1F3E7}","\u{1F6BE}","\u267F","\u{1F17F}\uFE0F","\u{1F6D7}","\u{1F233}","\u{1F202}\uFE0F","\u{1F6C2}","\u{1F6C3}","\u{1F6C4}","\u{1F6C5}","\u{1F6B9}","\u{1F6BA}","\u{1F6BC}","\u26A7\uFE0F","\u{1F6BB}","\u{1F6AE}","\u{1F3A6}","\u{1F4F6}","\u{1F201}","\u{1F523}","\u2139\uFE0F","\u{1F524}","\u{1F521}","\u{1F520}","\u{1F196}","\u{1F197}","\u{1F199}","\u{1F192}","\u{1F195}","\u{1F193}","0\uFE0F\u20E3","1\uFE0F\u20E3","2\uFE0F\u20E3","3\uFE0F\u20E3","4\uFE0F\u20E3","5\uFE0F\u20E3","6\uFE0F\u20E3","7\uFE0F\u20E3","8\uFE0F\u20E3","9\uFE0F\u20E3","\u{1F51F}","\u{1F522}","#\uFE0F\u20E3","*\uFE0F\u20E3","\u23CF\uFE0F","\u25B6\uFE0F","\u23F8\uFE0F","\u23EF\uFE0F","\u23F9\uFE0F","\u23FA\uFE0F","\u23ED\uFE0F","\u23EE\uFE0F","\u23E9","\u23EA","\u23EB","\u23EC","\u25C0\uFE0F","\u{1F53C}","\u{1F53D}","\u27A1\uFE0F","\u2B05\uFE0F","\u2B06\uFE0F","\u2B07\uFE0F","\u2197\uFE0F","\u2198\uFE0F","\u2199\uFE0F","\u2196\uFE0F","\u2195\uFE0F","\u2194\uFE0F","\u21AA\uFE0F","\u21A9\uFE0F","\u2934\uFE0F","\u2935\uFE0F","\u{1F500}","\u{1F501}","\u{1F502}","\u{1F504}","\u{1F503}","\u{1F3B5}","\u{1F3B6}","\u2795","\u2796","\u2797","\u2716\uFE0F","\u{1F7F0}","\u267E\uFE0F","\u{1F4B2}","\u{1F4B1}","\u2122\uFE0F","\xA9\uFE0F","\xAE\uFE0F","\u3030\uFE0F","\u27B0","\u27BF","\u{1F51A}","\u{1F519}","\u{1F51B}","\u{1F51D}","\u{1F51C}","\u2714\uFE0F","\u2611\uFE0F","\u{1F518}","\u{1F534}","\u{1F7E0}","\u{1F7E1}","\u{1F7E2}","\u{1F535}","\u{1F7E3}","\u26AB","\u26AA","\u{1F7E4}","\u{1F53A}","\u{1F53B}","\u{1F538}","\u{1F539}","\u{1F536}","\u{1F537}","\u{1F533}","\u{1F532}","\u25AA\uFE0F","\u25AB\uFE0F","\u25FE","\u25FD","\u25FC\uFE0F","\u25FB\uFE0F","\u{1F7E5}","\u{1F7E7}","\u{1F7E8}","\u{1F7E9}","\u{1F7E6}","\u{1F7EA}","\u2B1B","\u2B1C","\u{1F7EB}","\u{1F508}","\u{1F507}","\u{1F509}","\u{1F50A}","\u{1F514}","\u{1F515}","\u{1F4E3}","\u{1F4E2}","\u{1F4AC}","\u{1F4AD}","\u{1F5EF}\uFE0F","\u2660\uFE0F","\u2663\uFE0F","\u2665\uFE0F","\u2666\uFE0F","\u{1F550}","\u{1F551}","\u{1F552}","\u{1F553}","\u{1F554}","\u{1F555}","\u{1F556}","\u{1F557}","\u{1F558}","\u{1F559}","\u{1F55A}","\u{1F55B}","\u{1F55C}","\u{1F55D}","\u{1F55E}","\u{1F55F}","\u{1F560}","\u{1F561}","\u{1F562}","\u{1F563}","\u{1F564}","\u{1F565}","\u{1F566}","\u{1F567}","\u{1F3F3}\uFE0F","\u{1F3F4}","\u{1F3C1}","\u{1F6A9}","\u{1F38C}","\u{1F1FA}\u{1F1F8}","\u{1F1EC}\u{1F1E7}","\u{1F1EB}\u{1F1F7}","\u{1F1E9}\u{1F1EA}","\u{1F1EA}\u{1F1F8}","\u{1F1EE}\u{1F1F9}","\u{1F1EF}\u{1F1F5}","\u{1F1F0}\u{1F1F7}","\u{1F1E8}\u{1F1F3}","\u{1F1F7}\u{1F1FA}","\u{1F1E7}\u{1F1F7}","\u{1F1EE}\u{1F1F3}","\u{1F1E6}\u{1F1FA}","\u{1F1E8}\u{1F1E6}","\u{1F1F2}\u{1F1FD}","\u{1F1E6}\u{1F1F7}","\u{1F1F9}\u{1F1F7}","\u{1F1F8}\u{1F1E6}","\u{1F1E6}\u{1F1EA}","\u{1F1FF}\u{1F1E6}","\u{1F1F3}\u{1F1EC}","\u{1F1EA}\u{1F1EC}","\u{1F1F0}\u{1F1EA}","\u{1F1F9}\u{1F1ED}","\u{1F1FB}\u{1F1F3}","\u{1F1EE}\u{1F1E9}","\u{1F1F5}\u{1F1ED}","\u{1F1F2}\u{1F1FE}","\u{1F1F8}\u{1F1EC}","\u{1F1F3}\u{1F1FF}","\u{1F1E8}\u{1F1ED}","\u{1F1F8}\u{1F1EA}","\u{1F1F3}\u{1F1F4}","\u{1F1E9}\u{1F1F0}","\u{1F1EB}\u{1F1EE}","\u{1F1EE}\u{1F1EA}","\u{1F1F5}\u{1F1F9}","\u{1F1F3}\u{1F1F1}","\u{1F1E7}\u{1F1EA}","\u{1F1E6}\u{1F1F9}","\u{1F1F5}\u{1F1F1}","\u{1F1E8}\u{1F1FF}","\u{1F1F7}\u{1F1F4}","\u{1F1ED}\u{1F1FA}","\u{1F1EC}\u{1F1F7}","\u{1F1FA}\u{1F1E6}","\u{1F1EE}\u{1F1F1}","\u{1F1F5}\u{1F1F0}","\u{1F1E7}\u{1F1E9}","\u{1F1F1}\u{1F1F0}","\u{1F1F2}\u{1F1F2}","\u{1F1F0}\u{1F1ED}","\u{1F1F3}\u{1F1F5}","\u{1F1F2}\u{1F1F3}","\u{1F1E8}\u{1F1F4}","\u{1F1E8}\u{1F1F1}","\u{1F1F5}\u{1F1EA}","\u{1F1EA}\u{1F1E8}","\u{1F1FB}\u{1F1EA}","\u{1F1F5}\u{1F1E6}","\u{1F1E8}\u{1F1F7}","\u{1F1FA}\u{1F1FE}","\u{1F1F5}\u{1F1FE}","\u{1F1E7}\u{1F1F4}","\u{1F1ED}\u{1F1F3}","\u{1F1F8}\u{1F1FB}","\u{1F1F3}\u{1F1EE}","\u{1F1EC}\u{1F1F9}","\u{1F1E8}\u{1F1FA}","\u{1F1EF}\u{1F1F2}","\u{1F1ED}\u{1F1F9}","\u{1F1E9}\u{1F1F4}","\u{1F1F9}\u{1F1F9}","\u{1F1E7}\u{1F1E7}","\u{1F1E6}\u{1F1EC}","\u{1F1E9}\u{1F1F2}","\u{1F1EC}\u{1F1E9}","\u{1F1F0}\u{1F1F3}","\u{1F1F1}\u{1F1E8}","\u{1F1FB}\u{1F1E8}","\u{1F1E7}\u{1F1F8}","\u{1F1EF}\u{1F1F4}","\u{1F1F1}\u{1F1E7}","\u{1F1EE}\u{1F1F6}","\u{1F1EE}\u{1F1F7}","\u{1F1E6}\u{1F1EB}","\u{1F1F5}\u{1F1F8}","\u{1F1F8}\u{1F1FE}","\u{1F1FE}\u{1F1EA}","\u{1F1F4}\u{1F1F2}","\u{1F1F6}\u{1F1E6}","\u{1F1F0}\u{1F1FC}","\u{1F1E7}\u{1F1ED}","\u{1F1E6}\u{1F1FF}","\u{1F1EC}\u{1F1EA}","\u{1F1E6}\u{1F1F2}","\u{1F1F0}\u{1F1FF}","\u{1F1FA}\u{1F1FF}","\u{1F1F9}\u{1F1F2}","\u{1F1F0}\u{1F1EC}","\u{1F1F9}\u{1F1EF}","\u{1F1E6}\u{1F1F1}","\u{1F1F7}\u{1F1F8}","\u{1F1ED}\u{1F1F7}","\u{1F1E7}\u{1F1E6}","\u{1F1F2}\u{1F1EA}","\u{1F1F2}\u{1F1F0}","\u{1F1F8}\u{1F1EE}","\u{1F1E7}\u{1F1EC}","\u{1F1F1}\u{1F1F9}","\u{1F1F1}\u{1F1FB}","\u{1F1EA}\u{1F1EA}","\u{1F1E8}\u{1F1FE}","\u{1F1F2}\u{1F1F9}","\u{1F1F1}\u{1F1FA}","\u{1F1EE}\u{1F1F8}","\u{1F1E6}\u{1F1E9}","\u{1F1F2}\u{1F1E8}","\u{1F1F8}\u{1F1F2}","\u{1F1FB}\u{1F1E6}","\u{1F1F1}\u{1F1EE}","\u{1F1E7}\u{1F1F2}","\u{1F1F0}\u{1F1FE}","\u{1F1FB}\u{1F1EE}","\u{1F1EC}\u{1F1FA}","\u{1F1E6}\u{1F1F8}","\u{1F1F2}\u{1F1F5}","\u{1F1F5}\u{1F1FC}","\u{1F1EB}\u{1F1F2}","\u{1F1F2}\u{1F1ED}","\u{1F1F0}\u{1F1EE}","\u{1F1F3}\u{1F1F7}","\u{1F1F9}\u{1F1FB}","\u{1F1FC}\u{1F1F8}","\u{1F1F9}\u{1F1F4}","\u{1F1EB}\u{1F1EF}","\u{1F1F5}\u{1F1EC}","\u{1F1F8}\u{1F1E7}","\u{1F1FB}\u{1F1FA}","\u{1F1F3}\u{1F1E8}","\u{1F1F9}\u{1F1ED}","\u{1F1F0}\u{1F1ED}","\u{1F1F1}\u{1F1E6}","\u{1F1E7}\u{1F1F3}"];
var twemojiBase="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/";
function emojiToCodepoint(e){
  var cp=[];
  for(var i=0;i<e.length;i++){
    var code=e.codePointAt(i);
    if(code>0xFFFF)i++;
    if(code!==0xFE0F)cp.push(code.toString(16));
  }
  return cp.join("-");
}
function emojiImg(e,size){return "<img src='"+twemojiBase+emojiToCodepoint(e)+".svg' width='"+(size||22)+"' height='"+(size||22)+"' alt='' style='display:inline-block' loading='lazy'/>"}
var emojiRegex=/(\uD83C[\uDF00-\uDFFF]|\uD83D[\uDE00-\uDE4F\uDD00-\uDE7F\uDE80-\uDEFF\uDC00-\uDFFF]|[\u2600-\u27BF]|\uD83E[\uDD00-\uDDFF\uDDB0-\uDDBF\uDE00-\uDE6F\uDE70-\uDEFF\uFE0F]|\uFE0F|\u200D|\u20E3|[\u2B50\u2B55\u231A\u231B\u2328\u23CF\u23E9\u23EA\u23EB\u23EC\u23ED\u23EE\u23EF\u23F0\u23F1\u23F2\u23F3\u2602\u2604\u2611\u2614\u2615\u2622\u2623\u2626\u262A\u262E\u262F\u2638\u2639\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uFE0F)/g;
function parseTwemoji(el){
  el=el||document.body;
  var walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null,false);
  var nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
  nodes.forEach(function(node){
    if(!node.nodeValue||!emojiRegex.test(node.nodeValue))return;
    var p=node.parentNode;
    if(p&&(p.tagName==="SCRIPT"||p.tagName==="STYLE"))return;
    emojiRegex.lastIndex=0;
    var span=document.createElement("span");
    span.innerHTML=node.nodeValue.replace(emojiRegex,function(m){
      if(m.charCodeAt(0)===0xFE0F)return"";
      return emojiImg(m,16);
    });
    p.replaceChild(span,node);
  });
}
function renderEmojiGrid(filter){
  var grid=g("emojiGrid");
  var h="";
  allEmojis.forEach(function(e){
    if(filter&&!e.toLowerCase().includes(filter.toLowerCase()))return;
    h+="<span onclick='insertEmoji(&quot;"+e+"&quot;)' title='"+e+"' style='cursor:pointer;border-radius:4px;padding:2px;display:inline-flex;align-items:center;justify-content:center;transition:background .1s'>"+emojiImg(e)+"</span>";
  });
  grid.innerHTML=h;
}
function toggleEmojiPicker(){
  var picker=g("emojiPicker");
  if(picker.classList.contains("show")){picker.classList.remove("show");return}
  if(!g("emojiGrid").innerHTML)renderEmojiGrid();
  picker.classList.add("show");
}
function filterEmojis(q){
  renderEmojiGrid((q||"").toLowerCase());
}
function insertEmoji(e){
  var ta=g("msgInput");
  ta.value+=e;ta.focus();
  g("emojiPicker").classList.remove("show");
}
document.addEventListener("click",function(e){if(!e.target.closest(".emoji-picker-wrap")){var p=g("emojiPicker");if(p)p.classList.remove("show")}});

// --- Channel management ---
function loadChannels(){
  api({action:"channels"},function(d){
    if(d.error){g("channelManageList").innerHTML="<p style='color:#d45555;font-size:10px'>"+esc(d.error)+"</p>";return}
    var channels=d.channels||[];
    var categories=channels.filter(function(c){return c.type===4}).sort(function(a,b){return a.position-b.position});
    var catSel=g("newChannelCategory");
    catSel.innerHTML="<option value=''>no category</option>";
    for(var i=0;i<categories.length;i++){catSel.innerHTML+="<option value='"+categories[i].id+"'>"+esc(categories[i].name)+"</option>"}
    var h="";
    var grouped={};
    for(var i=0;i<channels.length;i++){
      var c=channels[i];
      var pid=c.parent_id||"_root";
      if(!grouped[pid])grouped[pid]=[];
      grouped[pid].push(c);
    }
    for(var pid in grouped){
      var items=grouped[pid].sort(function(a,b){return a.position-b.position});
      for(var i=0;i<items.length;i++){
        var c=items[i];
        var icon=c.type===0?"#":c.type===2?"\u{1F50A}":c.type===4?"\u{1F4C2}":"#";
        var typeLabel=c.type===0?"text":c.type===2?"voice":c.type===4?"category":"type "+c.type;
        h+="<div class='channel-card'>";
        h+="<span class='channel-icon'>"+icon+"</span>";
        h+="<span class='channel-name'>"+esc(c.name)+"</span>";
        h+="<span class='channel-type'>"+typeLabel+"</span>";
        if(c.type!==4)h+="<button class='channel-del' onclick='deleteChannel(&quot;"+c.id+"&quot;,&quot;"+esc(c.name)+"&quot;)'>delete</button>";
        h+="</div>";
      }
    }
    if(!channels.length)h="<p style='color:#5a5260;font-size:10px;text-align:center;padding:16px'>no channels</p>";
    g("channelManageList").innerHTML=h;
  });
}
function createChannel(){
  var name=g("newChannelName").value.trim();
  var type=g("newChannelType").value;
  var catId=g("newChannelCategory").value;
  if(!name){showToast("enter a channel name","error");return}
  var body={action:"create_channel",name:name,type:type};
  if(catId)body.categoryId=catId;
  api(body,function(d){
    if(d.success){showToast("channel created");g("newChannelName").value="";loadChannels()}
    else{showToast(d.error||"failed","error")}
  });
}
function deleteChannel(id,name){
  g("confirmTitle").textContent="delete #"+name;
  g("confirmBody").innerHTML="<p style='color:#7d7582;font-size:11px'>delete channel <b style='color:#e0dce4'>#"+esc(name)+"</b>? This cannot be undone.</p>";
  var btn=g("confirmBtn");btn.className="confirm-danger";btn.textContent="delete";
  btn.onclick=function(){api({action:"delete_channel",channelId:id},function(d){closeConfirm();if(d.success){showToast("channel deleted");loadChannels()}else{showToast(d.error||"failed","error")}})};
  g("confirmOverlay").classList.add("show");
}

// --- Invite management ---
function loadInvites(){
  g("inviteList").innerHTML="<p style='color:#6d6572;font-size:10px;text-align:center;padding:16px'>loading...</p>";
  api({action:"invites"},function(d){
    if(d.error){g("inviteList").innerHTML="<p style='color:#d45555;font-size:10px'>"+esc(d.error)+"</p>";return}
    var invites=d.invites||[];
    if(!invites.length){g("inviteList").innerHTML="<p style='color:#5a5260;font-size:10px;text-align:center;padding:16px'>no invites</p>";return}
    var h="";
    for(var i=0;i<invites.length;i++){
      var inv=invites[i];
      var inviter=inv.inviter;
      var inviterName=inviter?(inviter.global_name||inviter.username):"unknown";
      h+="<div class='invite-card'>";
      h+="<div class='invite-info'><div class='invite-code'>"+esc(inv.code)+"</div>";
      h+="<div class='invite-meta'>by <b style='color:#e0dce4'>"+esc(inviterName)+"</b>"+(inv.channel?" \xB7 #"+esc(inv.channel.name||""):"")+"</div>";
      h+="<div class='invite-uses'>"+(inv.uses||0)+" uses"+(inv.max_uses?" / "+inv.max_uses+" max":"")+"</div></div>";
      h+="<button class='invite-del' onclick='deleteInvite(&quot;"+esc(inv.code)+"&quot;)'>delete</button>";
      h+="</div>";
    }
    g("inviteList").innerHTML=h;
  });
}
function deleteInvite(code){
  api({action:"delete_invite",inviteCode:code},function(d){
    if(d.success){showToast("invite deleted");loadInvites()}
    else{showToast(d.error||"failed","error")}
  });
}

// --- Emoji/Sticker list ---
function loadEmojis(){
  g("emojiContent").innerHTML="<p style='color:#6d6572;font-size:10px;text-align:center;padding:16px'>loading...</p>";
  api({action:"emojis"},function(d){
    if(d.error){g("emojiContent").innerHTML="<p style='color:#d45555;font-size:10px'>"+esc(d.error)+"</p>";return}
    var emojis=d.emojis||[];
    if(!emojis.length){g("emojiContent").innerHTML="<p style='color:#5a5260;font-size:10px;text-align:center;padding:16px'>no custom emojis</p>";return}
    var h="<div class='emoji-grid'>";
    for(var i=0;i<emojis.length;i++){
      var e=emojis[i];
      var ext=e.animated?".gif":".png";
      var url="https://cdn.discordapp.com/emojis/"+e.id+ext;
      h+="<div class='emoji-item' title=':"+esc(e.name)+":'>"+((e.animated||ext===".gif")?"<img src='"+url+"' alt='' loading='lazy'/>":"<img src='"+url+"' alt='' loading='lazy'/>")+"<span>:"+esc(e.name)+":</span></div>";
    }
    h+="</div>";
    g("emojiContent").innerHTML=h;
  });
}

// --- Scheduled Events ---
function loadEvents(){
  g("eventList").innerHTML="<p style='color:#6d6572;font-size:10px;text-align:center;padding:16px'>loading...</p>";
  api({action:"events"},function(d){
    if(d.error){g("eventList").innerHTML="<p style='color:#d45555;font-size:10px'>"+esc(d.error)+"</p>";return}
    var events=d.events||[];
    if(!events.length){g("eventList").innerHTML="<p style='color:#5a5260;font-size:10px;text-align:center;padding:16px'>no scheduled events</p>";return}
    var h="";
    for(var i=0;i<events.length;i++){
      var ev=events[i];
      var start=new Date(ev.scheduled_start_time);
      var startStr=start.toLocaleString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"});
      var statusClass=ev.status===1?"event-scheduled":ev.status===2?"event-active":ev.status===3?"event-completed":"event-cancelled";
      var statusText=ev.status===1?"scheduled":ev.status===2?"active":ev.status===3?"ended":"cancelled";
      h+="<div class='event-card'>";
      h+="<div><span class='event-name'>"+esc(ev.name)+"</span><span class='event-status "+statusClass+"'>"+statusText+"</span></div>";
      h+="<div class='event-time'>"+startStr+"</div>";
      if(ev.description)h+="<div class='event-desc'>"+esc(ev.description.substring(0,200))+"</div>";
      h+="<button class='event-del' onclick='deleteEvent(&quot;"+ev.id+"&quot;)'>delete</button>";
      h+="</div>";
    }
    g("eventList").innerHTML=h;
  });
}
function createEvent(){
  var name=g("newEventName").value.trim();
  var start=g("newEventStart").value;
  var end=g("newEventEnd").value;
  if(!name){showToast("enter event name","error");return}
  if(!start){showToast("select start time","error");return}
  var body={action:"create_event",name:name,startTime:new Date(start).toISOString()};
  if(end)body.endTime=new Date(end).toISOString();
  api(body,function(d){
    if(d.success){showToast("event created");g("newEventName").value="";g("newEventStart").value="";g("newEventEnd").value="";loadEvents()}
    else{showToast(d.error||"failed","error")}
  });
}
function deleteEvent(id){
  g("confirmTitle").textContent="delete event";
  g("confirmBody").innerHTML="<p style='color:#7d7582;font-size:11px'>delete this event?</p>";
  var btn=g("confirmBtn");btn.className="confirm-danger";btn.textContent="delete";
  btn.onclick=function(){api({action:"delete_event",eventId:id},function(d){closeConfirm();if(d.success){showToast("event deleted");loadEvents()}else{showToast(d.error||"failed","error")}})};
  g("confirmOverlay").classList.add("show");
}

// --- Audit Log ---
function loadAuditLog(){
  g("auditList").innerHTML="<p style='color:#6d6572;font-size:10px;text-align:center;padding:16px'>loading...</p>";
  api({action:"audit_log",limit:50},function(d){
    if(d.error){g("auditList").innerHTML="<p style='color:#d45555;font-size:10px'>"+esc(d.error)+"</p>";return}
    var entries=d.entries||[];
    var users=d.users||[];
    if(!entries.length){g("auditList").innerHTML="<p style='color:#5a5260;font-size:10px;text-align:center;padding:16px'>no audit log entries</p>";return}
    var userMap={};for(var i=0;i<users.length;i++)userMap[users[i].id]=users[i];
    var h="";
    for(var i=0;i<entries.length;i++){
      var e=entries[i];
      var user=userMap[e.user_id];
      var userName=user?(user.global_name||user.username):e.user_id;
      var avatar=user&&user.avatar?"https://cdn.discordapp.com/avatars/"+user.id+"/"+user.avatar+(user.avatar.startsWith("a_")?".gif":".png"):"https://cdn.discordapp.com/embed/avatars/"+((user?user.discriminator:"0")%5||0)+".png";
      var ts=new Date(e.id?String(BigInt(e.id)>>22n+1420070400000):Date.now());
      var timeStr=ts.toLocaleString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"});
      var actionText=formatAuditAction(e,userName);
      h+="<div class='audit-entry'>";
      h+="<img class='audit-avatar' src='"+avatar+"' alt='' loading='lazy'/>";
      h+="<div class='audit-info'><div class='audit-action'>"+actionText+"</div></div>";
      h+="<span class='audit-time'>"+timeStr+"</span>";
      h+="</div>";
    }
    g("auditList").innerHTML=h;
  });
}
function formatAuditAction(e,userName){
  var d=e.changes||[];
  var target=e.target_id;
  var actions={
    1:"created",2:"updated",3:"deleted",10:"kick",11:"prune",12:"ban",13:"unban",
    14:"role update",15:"role create",16:"role delete",20:"invite create",21:"invite delete",
    22:"webhook create",23:"webhook update",24:"webhook delete",25:"emoji create",26:"emoji update",27:"emoji delete",
    28:"message delete",29:"bulk delete",30:"channel create",31:"channel update",32:"channel overwrite create",
    33:"channel overwrite update",34:"channel overwrite delete",35:"member role update",36:"member move",
    37:"member disconnect",38:"bot add",39:"role update",40:"role move",42:"members prune",
    43:"connection create",44:"connection update",45:"connection delete",46:"bot remove",47:"integration create",
    48:"integration update",49:"integration delete",50:"stage create",51:"stage update",52:"stage delete",
    53:"sticker create",54:"sticker update",55:"sticker delete",56:"scheduled event create",
    57:"scheduled event update",58:"scheduled event delete",61:"thread create",62:"thread update",63:"thread delete",
    64:"permission create",65:"permission update",66:"permission delete",67:"auto moderation rule create",
    68:"auto moderation rule update",69:"auto moderation rule delete",70:"auto moderation block message",
    71:"auto moderation flag to channel",72:"auto moderation member communication disabled"
  };
  var actionStr=actions[e.action_type]||"action #"+e.action_type;
  var result="<b>"+esc(userName)+"</b> <span class='hl'>"+esc(actionStr)+"</span>";
  if(target)result+=" <span class='hl'>"+esc(target)+"</span>";
  if(d.length){
    for(var i=0;i<Math.min(d.length,2);i++){
      var c=d[i];
      if(c.name)result+=" \xB7 "+esc(c.name);
    }
  }
  return result;
}

// --- Role management in member modal ---
function showMember(id){
  var m=allMembers.find(function(x){return x.user.id===id});if(!m)return;
  var name=m.nick||(m.user.global_name||m.user.username);
  var avatar=m.user.avatar?"https://cdn.discordapp.com/avatars/"+m.user.id+"/"+m.user.avatar+(m.user.avatar.startsWith("a_")?".gif":".png"):"https://cdn.discordapp.com/embed/avatars/"+(parseInt(m.user.discriminator||"0")%5)+".png";
  var joined=new Date(m.joined_at).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"});
  var rolesHtml="";
  for(var i=0;i<m.roles.length;i++){
    var role=allRoles.find(function(x){return x.id===m.roles[i]});
    if(role){
      var rc=role.color?"#"+role.color.toString(16).padStart(6,"0"):"#555";
      rolesHtml+="<div class='modal-role'><span class='modal-role-dot' style='background:"+rc+"'></span>"+esc(role.name)+"</div>";
    }
  }
  var roleManagerHtml="<div class='role-manager'>";
  for(var i=0;i<allRoles.length;i++){
    var r=allRoles[i];
    if(r.id===m.guild_id)continue;
    var hasRole=m.roles.indexOf(r.id)!==-1;
    var rc=r.color?"#"+r.color.toString(16).padStart(6,"0"):"#555";
    roleManagerHtml+="<div class='role-manage-item"+(hasRole?" has-role":"")+"' data-roleid='"+r.id+"' data-uid='"+m.user.id+"' onclick='toggleMemberRole(this)'>";
    roleManagerHtml+="<span class='role-check'>"+(hasRole?"&#10003;":"")+"</span>";
    roleManagerHtml+="<span class='modal-role-dot' style='background:"+rc+"'></span>"+esc(r.name);
    roleManagerHtml+="</div>";
  }
  roleManagerHtml+="</div>";
  g("modalBox").innerHTML="<div class='modal-header'><img src='"+avatar+"' alt='' /><div class='modal-header-info'><h3>"+esc(name)+"</h3><p>"+esc(m.user.username)+(m.user.bot?" &middot; bot":"")+"</p></div></div>"+
    "<div class='modal-body'>"+
    "<div id='modalBadges'></div>"+
    "<div class='modal-section'><div class='modal-section-label'>id</div><p style='color:#9a929e;font-size:11px'>"+m.user.id+"</p></div>"+
    "<div class='modal-section'><div class='modal-section-label'>joined</div><p style='color:#9a929e;font-size:11px'>"+joined+"</p></div>"+
    (m.premium_since?"<div class='modal-section'><div class='modal-section-label'>boosting since</div><p style='color:#9a929e;font-size:11px'>"+new Date(m.premium_since).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})+"</p></div>":"")+
    "<div class='modal-section'><div class='modal-section-label'>roles</div><div class='modal-roles'>"+(rolesHtml||"<span style='color:#5a5260;font-size:10px'>no roles</span>")+"</div></div>"+
    "<div class='modal-section'><div class='modal-section-label'>manage roles</div>"+roleManagerHtml+"</div>"+
    "</div>"+
    "<div class='modal-actions'>"+
    "<button class='btn-timeout' data-action='timeout' data-uid='"+m.user.id+"' data-uname='"+esc(name)+"' onclick='openConfirm(this)'>timeout</button>"+
    "<button class='btn-kick' data-action='kick' data-uid='"+m.user.id+"' data-uname='"+esc(name)+"' onclick='openConfirm(this)'>kick</button>"+
    "<button class='btn-ban' data-action='ban' data-uid='"+m.user.id+"' data-uname='"+esc(name)+"' onclick='openConfirm(this)'>ban</button>"+
    "</div>"+
    "<div class='modal-footer'><button onclick='c()'>close</button></div>";
  g("userModal").classList.add("show");
  api({action:"userinfo",userId:id},function(u){
    if(!u||u.error)return;
    var bannerHtml="";
    if(u.banner){
      var ext=u.banner.startsWith("a_")?".gif":".png";
      bannerHtml="<div class='modal-banner' style='background-image:url(https://cdn.discordapp.com/banners/"+u.id+"/"+u.banner+ext+"?size=480)'></div>";
    }else if(u.accent_color!=null){
      var ac="#"+u.accent_color.toString(16).padStart(6,"0");
      bannerHtml="<div class='modal-banner-color' style='background:"+ac+"'></div>";
    }else{
      var rc="#b48899";
      for(var ri=0;ri<m.roles.length;ri++){
        var rl=allRoles.find(function(x){return x.id===m.roles[ri]});
        if(rl&&rl.color){rc="#"+rl.color.toString(16).padStart(6,"0");break}
      }
      bannerHtml="<div class='modal-banner-color' style='background:"+rc+"'></div>";
    }
    var box=g("modalBox");
    box.insertAdjacentHTML("afterbegin",bannerHtml);
    if(u.banner){
      var newAvatar=u.avatar?"https://cdn.discordapp.com/avatars/"+u.id+"/"+u.avatar+(u.avatar.startsWith("a_")?".gif":".png"):avatar;
      var headerImg=box.querySelector(".modal-header img");
      if(headerImg)headerImg.src=newAvatar;
    }
    var flagsList=[];
    var f=u.public_flags||u.flags||0;
    if(f&1)flagsList.push("Discord Staff");
    if(f&2)flagsList.push("Discord Partner");
    if(f&4)flagsList.push("HypeSquad Events");
    if(f&8)flagsList.push("Bug Hunter L1");
    if(f&64)flagsList.push("Bug Hunter L2");
    if(f&128)flagsList.push("HypeSquad Bravery");
    if(f&256)flagsList.push("HypeSquad Brilliance");
    if(f&512)flagsList.push("HypeSquad Balance");
    if(f&16384)flagsList.push("Early Supporter");
    if(f&131072)flagsList.push("Verified Bot Developer");
    var badgesEl=g("modalBadges");
    if(badgesEl&&flagsList.length)badgesEl.innerHTML="<div class='modal-section'><div class='modal-section-label'>badges</div><div style='display:flex;flex-wrap:wrap;gap:3px'>"+flagsList.map(function(fl){return "<span style='font-size:9px;padding:2px 6px;background:#252a32;border:1px solid #2e343c;border-radius:2px;color:#7d7582'>"+fl+"</span>"}).join("")+"</div></div>";
  });
}
function toggleMemberRole(el){
  var roleId=el.dataset.roleid,userId=el.dataset.uid;
  var hasRole=el.classList.contains("has-role");
  var action=hasRole?"remove_role":"add_role";
  el.style.opacity="0.5";
  api({action:action,userId:userId,roleId:roleId},function(d){
    el.style.opacity="1";
    if(d.success){
      el.classList.toggle("has-role");
      var check=el.querySelector(".role-check");
      if(check)check.innerHTML=el.classList.contains("has-role")?"&#10003;":"";
      loadMembers();
    }else{showToast(d.error||"failed","error")}
  });
}

// --- Dashboard activity ---
function loadDashboardActivity(){
  api({action:"guild_activity"},function(d){
    if(d.error)return;
    var el=g("dashActivity");
    if(!el)return;
    var h="";
    if(d.recentJoins&&d.recentJoins.length){
      h+="<div style='margin-bottom:8px'><span style='font-size:10px;color:#6d6572;text-transform:uppercase;letter-spacing:.5px;font-weight:600'>recent joins ("+d.totalJoins7d+" this week)</span></div>";
      for(var i=0;i<Math.min(d.recentJoins.length,10);i++){
        var j=d.recentJoins[i];
        var u=j.user;
        var name=u.global_name||u.username;
        var avatar=u.avatar?"https://cdn.discordapp.com/avatars/"+u.id+"/"+u.avatar+(u.avatar.startsWith("a_")?".gif":".png"):"https://cdn.discordapp.com/embed/avatars/"+(parseInt(u.discriminator||"0")%5)+".png";
        var ago=timeAgo(new Date(j.joined_at));
        h+="<div class='activity-item'><img src='"+avatar+"' alt='' loading='lazy'/><div class='activity-text'><b>"+esc(name)+"</b> joined<span class='activity-badge badge-join'>join</span></div><span class='activity-time'>"+ago+"</span></div>";
      }
    }
    if(d.bans&&d.bans.length){
      h+="<div style='margin:12px 0 8px'><span style='font-size:10px;color:#6d6572;text-transform:uppercase;letter-spacing:.5px;font-weight:600'>recent bans</span></div>";
      for(var i=0;i<Math.min(d.bans.length,5);i++){
        var b=d.bans[i];var u=b.user;
        var name=u.global_name||u.username;
        var avatar=u.avatar?"https://cdn.discordapp.com/avatars/"+u.id+"/"+u.avatar+(u.avatar.startsWith("a_")?".gif":".png"):"https://cdn.discordapp.com/embed/avatars/"+(parseInt(u.discriminator||"0")%5)+".png";
        h+="<div class='activity-item'><img src='"+avatar+"' alt='' loading='lazy'/><div class='activity-text'><b>"+esc(name)+"</b>"+(b.reason?" \xB7 "+esc(b.reason):"")+"<span class='activity-badge badge-ban'>ban</span></div></div>";
      }
    }
    if(!h)h="<p style='color:#5a5260;font-size:10px;text-align:center;padding:12px'>no recent activity</p>";
    el.innerHTML=h;
  });
}
function timeAgo(date){
  var s=Math.floor((Date.now()-date.getTime())/1000);
  if(s<60)return s+"s ago";
  if(s<3600)return Math.floor(s/60)+"m ago";
  if(s<86400)return Math.floor(s/3600)+"h ago";
  return Math.floor(s/86400)+"d ago";
}

// --- Guild edit ---
function editGuildName(){
  var current=g("guildNameDisplay");
  if(!current)return;
  var oldName=current.textContent;
  current.outerHTML="<input type='text' id='guildNameInput' value='"+esc(oldName)+"' style='font-size:16px;color:#e0dce4;background:#191d23;border:1px solid #b48899;padding:2px 6px;border-radius:4px;font-weight:600;font-family:Space Grotesk,monospace;width:200px' onkeydown='if(event.key===&quot;Enter&quot;)saveGuildName();if(event.key===&quot;Escape&quot;)cancelGuildEdit(&quot;"+esc(oldName)+"&quot;)'/>";
  g("guildNameInput").focus();g("guildNameInput").select();
}
function saveGuildName(){
  var input=g("guildNameInput");
  if(!input)return;
  var name=input.value.trim();
  if(!name||name.length>100){showToast("invalid name","error");return}
  api({action:"edit_guild",name:name},function(d){
    if(d.success){showToast("server name updated");loadDashboard()}
    else{showToast(d.error||"failed","error")}
  });
}
function cancelGuildEdit(name){
  var input=g("guildNameInput");
  if(input)input.outerHTML="<span id='guildNameDisplay' style='cursor:pointer' onclick='editGuildName()' title='click to edit'>"+esc(name)+"</span>";
}
var currentDmChannel=null;
var dmPollTimer=null;
function startDmPoll(){
  if(dmPollTimer)clearInterval(dmPollTimer);
  dmPollTimer=setInterval(function(){if(currentDmChannel)loadDmHistory(currentDmChannel)},4000);
}
function stopDmPoll(){
  if(dmPollTimer){clearInterval(dmPollTimer);dmPollTimer=null}
}
function startDmById(){
  var uid=g("dmUserId").value.trim();
  if(!uid)return;
  g("dmStart").style.display="none";
  g("dmChat").style.display="block";
  g("dmChatName").textContent=uid;
  g("dmHistory").innerHTML="<p style='color:#6d6572;text-align:center;padding:20px 0'>opening dm...</p>";
  g("dmInput").value="";
  g("dmStatus").textContent="";
  api({action:"dm_send",userId:uid,content:""},function(d){
    if(d.error){g("dmHistory").innerHTML="<p style='color:#d45555;text-align:center;padding:20px 0'>"+esc(d.error)+"</p>";return}
    currentDmChannel=d.channelId;
    startDmPoll();
    api({action:"userinfo",userId:uid},function(u){
      if(u&&!u.error)g("dmChatName").textContent=u.global_name||u.username||uid;
    });
    loadDmHistory(d.channelId);
  });
}
function dmClose(){
  currentDmChannel=null;
  stopDmPoll();
  g("dmChat").style.display="none";
  g("dmStart").style.display="block";
}
function loadDmHistory(cid){
  g("dmHistory").innerHTML="<p style='color:#6d6572;text-align:center;padding:20px 0'>loading...</p>";
  api({action:"dm_messages",channelId:cid,limit:50},function(d){
    if(d.error){g("dmHistory").innerHTML="<p style='color:#d45555;text-align:center;padding:20px 0'>"+esc(d.error)+"</p>";return}
    if(!d.messages||!d.messages.length){g("dmHistory").innerHTML="<p style='color:#5a5260;text-align:center;padding:20px 0'>no messages</p>";return}
    var h="";
    for(var i=d.messages.length-1;i>=0;i--){
      var msg=d.messages[i],u=msg.author;
      if(!u)continue;
      var name=u.global_name||u.username;
      var time=new Date(msg.timestamp).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"});
      var avatar=u.avatar?"https://cdn.discordapp.com/avatars/"+u.id+"/"+u.avatar+(u.avatar.startsWith("a_")?".gif":".png"):"https://cdn.discordapp.com/embed/avatars/"+(parseInt(u.discriminator||"0")%5)+".png";
      h+="<div class='msg-row'>";
      h+="<img class='msg-avatar' src='"+avatar+"' alt='' loading='lazy'/>";
      h+="<div class='msg-body'>";
      h+="<div><span class='msg-author'>"+esc(name)+"</span><span class='msg-time'>"+time+"</span>"+(msg.edited_timestamp?"<span class='msg-edited'>(edited)</span>":"")+"</div>";
      if(msg.referenced_message&&msg.referenced_message.author){
        var ru=msg.referenced_message.author,rn=ru.global_name||ru.username;
        h+="<div class='msg-ref'>&#8618; "+esc(rn)+": "+fmt(msg.referenced_message.content||"(attachment)")+"</div>";
      }
      h+="<div class='msg-content'>"+fmt(msg.content||"")+"</div>";
      if(msg.sticker_items&&msg.sticker_items.length){
        for(var j=0;j<msg.sticker_items.length;j++){
          var s=msg.sticker_items[j];
          h+="<img class='msg-sticker' src='https://cdn.discordapp.com/stickers/"+s.id+".png' alt='' loading='lazy'/>";
        }
      }
      if(msg.attachments&&msg.attachments.length){
        for(var j=0;j<msg.attachments.length;j++){
          var a=msg.attachments[j];
          if(a.content_type&&(a.content_type.startsWith("image/")||a.width)){
            h+="<img class='msg-img' src='"+escUrl(a.url)+"' alt='' loading='lazy'/>";
          }else if(a.content_type&&a.content_type.startsWith("video/")){
            h+="<video class='msg-video' src='"+escUrl(a.url)+"' controls></video>";
          }else if(a.content_type&&a.content_type.startsWith("audio/")){
            h+="<audio class='msg-audio' src='"+escUrl(a.url)+"' controls></audio>";
          }else{
            h+="<div><a class='msg-file-link' href='"+escUrl(a.url)+"'>"+esc(a.filename)+"</a></div>"
          }
        }
      }
      h+="</div>";
      h+="<span class='msg-del' data-cid='"+cid+"' data-mid='"+msg.id+"' onclick='deleteDmMsg(this.dataset.cid,this.dataset.mid)' title='delete'>&#10005;</span>";
      h+="</div>";
    }
    g("dmHistory").innerHTML=h;
    parseTwemoji(g("dmHistory"));
    g("dmHistory").scrollTop=g("dmHistory").scrollHeight;
  });
}
function sendDm(){
  var c=currentDmChannel,m=g("dmInput").value;
  if(!m){g("dmStatus").textContent="enter a message";g("dmStatus").style.color="#f44";return}
  g("dmStatus").style.color="#aaa";g("dmStatus").textContent="sending...";
  var body={action:"dm_send",content:m};
  if(c)body.channelId=c;
  else{g("dmStatus").style.color="#f44";g("dmStatus").textContent="no recipient";return}
  api(body,function(d){
    if(d.success){
      g("dmStatus").style.color="#4f4";g("dmStatus").textContent="sent!";
      g("dmInput").value="";
      if(d.channelId&&!currentDmChannel)currentDmChannel=d.channelId;
      if(currentDmChannel)loadDmHistory(currentDmChannel);
    }else{
      g("dmStatus").style.color="#f44";g("dmStatus").textContent=d.error||"failed";
    }
  });
}
function deleteDmMsg(cid,mid){
  if(!confirm("delete this message?"))return;
  api({action:"delete",channelId:cid,messageId:mid},function(d){
    if(d.success){loadDmHistory(cid)}
    else{alert(d.error||"failed to delete")}
  });
}
var confirmData={};
function openConfirm(el){
  var action=el.dataset.action,userId=el.dataset.uid,userName=el.dataset.uname;
  confirmData={action:action,userId:userId};
  var title={timeout:"timeout "+userName,kick:"kick "+userName,ban:"ban "+userName};
  var h="";
  if(action==="timeout"){
    h+="<label>duration</label><select id='cfDuration'><option value='1'>1 minute</option><option value='5'>5 minutes</option><option value='10'>10 minutes</option><option value='30' selected>30 minutes</option><option value='60'>1 hour</option><option value='360'>6 hours</option><option value='1440'>24 hours</option><option value='10080'>7 days</option></select>";
  }
  h+="<label>reason (optional)</label><input type='text' id='cfReason' placeholder='reason...'/>";
  g("confirmTitle").textContent=title[action];
  g("confirmBody").innerHTML=h;
  var btn=g("confirmBtn");
  btn.className="confirm-danger";
  btn.textContent=action;
  g("confirmOverlay").classList.add("show");
}
function closeConfirm(){g("confirmOverlay").classList.remove("show")}
function executeConfirm(){
  var action=confirmData.action,userId=confirmData.userId,reason=g("cfReason").value;
  var body={action:action,userId:userId};
  if(reason)body.reason=reason;
  if(action==="timeout")body.minutes=parseInt(g("cfDuration").value)||30;
  closeConfirm();c();
  g("memberList").innerHTML="<p style='color:#6d6572;text-align:center;padding:20px 0'>executing "+action+"...</p>";
  api(body,function(d){
    if(d.success){
      loadMembers();
    }else{
      alert(d.error||"failed to "+action);
      loadMembers();
    }
  });
}
document.addEventListener("click",function(e){if(!e.target.closest("#mentionSearch")&&!e.target.closest("#mentionList"))hideMentionList();if(!e.target.closest("#channelPicker")&&!e.target.closest("#channelList"))hideChannelList()});
api({action:"guildinfo"},function(d){
  if(d.error&&d.error==="Unauthorized"){g("sidebar").style.display="flex";g("panel-dashboard").classList.add("show");g("loginOverlay").style.display="flex"}
  else{initPanel()}
});
</script>
</body>
</html>`;
}
async function handler(req, res) {
  const clientIp = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || "unknown";
  if (!checkRateLimit(clientIp)) {
    logRequest(req.method || "?", "/api", void 0, clientIp, 429);
    return res.status(429).json({ error: "Too many requests" });
  }
  try {
    if (req.method === "GET") {
      const code = req.query.code;
      if (code) {
        return await handleOAuthCallback(req, res, code);
      }
      const oauthError = req.query.error;
      if (oauthError) {
        const desc = req.query.error_description || "Login was denied.";
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        return res.status(403).send("<html><body style='background:#13161b;color:#d45555;font-family:monospace;display:flex;justify-content:center;align-items:center;height:100vh'><div style='text-align:center'><h1>Access Denied</h1><p style='color:#7d7582'>" + htmlEscape(desc) + "</p><a href='/api' style='color:#b48899'>&larr; back</a></div></body></html>");
      }
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      return res.status(200).send(html());
    }
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }
    const signature = req.headers["x-signature-ed25519"];
    const timestamp = req.headers["x-signature-timestamp"];
    let body = req.body;
    if (!body) {
      try {
        const chunks = [];
        let totalSize = 0;
        const MAX_BODY_SIZE = 1024 * 1024;
        for await (const chunk of req) {
          totalSize += chunk.length;
          if (totalSize > MAX_BODY_SIZE) {
            return res.status(413).json({ error: "Request body too large" });
          }
          chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
        }
        const raw = Buffer.concat(chunks).toString();
        if (raw) body = JSON.parse(raw);
      } catch {
      }
    }
    if (!body || typeof body !== "object") {
      return res.status(400).json({ error: "Invalid body" });
    }
    if (typeof signature === "string" && typeof timestamp === "string") {
      return await handleDiscord(req, res, JSON.stringify(body), signature, timestamp);
    }
    const panelResult = await handlePanel(res, body, req);
    logRequest("POST", "/api", body.action, clientIp, res.statusCode || 200);
    return panelResult;
  } catch (error) {
    console.error("Handler error", error);
    logRequest(req.method || "?", "/api", void 0, clientIp, 500);
    return res.status(500).json({ error: "Internal error" });
  }
}
async function handleDiscord(req, res, rawBody, signature, timestamp) {
  if (!process.env.DISCORD_PUBLIC_KEY) {
    return res.status(500).json({ error: "No public key" });
  }
  let isValid = false;
  try {
    isValid = await (0, import_discord_interactions2.verifyKey)(Buffer.from(rawBody), signature, timestamp, process.env.DISCORD_PUBLIC_KEY);
  } catch {
    return res.status(401).json({ error: "Invalid signature" });
  }
  if (!isValid) return res.status(401).json({ error: "Invalid signature" });
  const message = JSON.parse(rawBody);
  if (message.type === import_discord_interactions2.InteractionType.PING) {
    return res.status(200).json({ type: InteractionResponseType.Pong });
  }
  if (message.type === import_discord_interactions2.InteractionType.APPLICATION_COMMAND) {
    const commandName = message.data.name.toLowerCase();
    const command = commands_default[commandName];
    if (command) {
      try {
        await discordFetch3(
          `https://discord.com/api/v10/interactions/${message.id}/${message.token}/callback`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              type: InteractionResponseType.DeferredChannelMessageWithSource,
              data: { flags: command.data.initialEphemeral ? MessageFlags.Ephemeral : 0 }
            })
          }
        );
      } catch {
        return res.status(500).json({ error: "Failed to defer" });
      }
      let commandResult;
      try {
        commandResult = await command.execute({ interaction: message });
      } catch (error) {
        const errMsg = error instanceof Error ? error.message : "Unknown error";
        commandResult = {
          flags: MessageFlags.Ephemeral,
          embeds: [{
            color: 15548997,
            title: "Command Error",
            fields: [
              { name: "Command", value: `/${commandName}`, inline: true },
              { name: "Error", value: `\`\`\`
${errMsg.length > 1e3 ? errMsg.slice(0, 1e3) + "..." : errMsg}
\`\`\``, inline: false }
            ]
          }]
        };
      }
      try {
        await discordFetch3(
          `https://discord.com/api/v10/webhooks/${message.application_id}/${message.token}/messages/@original`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              content: commandResult.content ?? "",
              flags: commandResult.flags,
              embeds: commandResult.embeds
            })
          }
        );
        return res.status(200).end();
      } catch {
        return res.status(500).json({ error: "Failed to update message" });
      }
    }
    return res.status(400).json({ error: "Unknown Command" });
  }
  return res.status(400).json({ error: "Unknown Interaction Type" });
}
async function handleOAuthCallback(req, res, code) {
  try {
    const stateCookie = (req.headers.cookie || "").match(/oauth_state=([^;]+)/)?.[1] || "";
    const stateParam = req.query.state || "";
    if (!stateParam || !stateCookie || !verifyState(stateParam) || stateParam !== stateCookie) {
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      return res.status(403).send("<html><body style='background:#13161b;color:#d45555;font-family:monospace;display:flex;justify-content:center;align-items:center;height:100vh'><div style='text-align:center'><h1>Invalid State</h1><p style='color:#7d7582'>CSRF validation failed.</p><a href='/api' style='color:#b48899'>&larr; back</a></div></body></html>");
    }
    res.setHeader("Set-Cookie", "oauth_state=; Path=/; Max-Age=0; SameSite=Strict; HttpOnly; Secure");
    const params = new URLSearchParams({
      client_id: DISCORD_APP_ID,
      client_secret: DISCORD_CLIENT_SECRET,
      grant_type: "authorization_code",
      code,
      redirect_uri: OAUTH_REDIRECT
    });
    const tokenRes = await discordFetch3("https://discord.com/api/v10/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString()
    });
    const userRes = await discordFetch3("https://discord.com/api/v10/users/@me", {
      headers: { Authorization: `Bearer ${tokenRes.access_token}` }
    });
    if (userRes.id !== DISCORD_OWNER_ID) {
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      return res.status(403).send("<html><body style='background:#13161b;color:#d45555;font-family:monospace;display:flex;justify-content:center;align-items:center;height:100vh'><div style='text-align:center'><h1>Access Denied</h1><p style='color:#7d7582'>This account is not authorized.</p><a href='/api' style='color:#b48899'>\u2190 back</a></div></body></html>");
    }
    res.setHeader("Set-Cookie", `token=${signToken(userRes.id)}; Path=/; Max-Age=86400; SameSite=Strict; HttpOnly; Secure`);
    res.setHeader("Location", "/api");
    return res.status(302).end();
  } catch (err) {
    console.error("OAuth callback error:", err.message);
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    return res.status(500).send("<html><body style='background:#13161b;color:#d45555;font-family:monospace;display:flex;justify-content:center;align-items:center;height:100vh'><div style='text-align:center'><h1>OAuth Error</h1><p style='color:#7d7582'>" + htmlEscape(err.message || "Unknown error") + "</p><a href='/api' style='color:#b48899'>\u2190 back</a></div></body></html>");
  }
}
async function handlePanel(res, body, req) {
  if (body.action === "oauth_url") {
    const state = import_crypto.default.randomBytes(16).toString("hex");
    const signedState = signState(state);
    res.setHeader("Set-Cookie", `oauth_state=${signedState}; Path=/; Max-Age=600; SameSite=Lax; HttpOnly; Secure`);
    const url = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_APP_ID}&redirect_uri=${encodeURIComponent(OAUTH_REDIRECT)}&response_type=code&scope=identify&state=${encodeURIComponent(signedState)}`;
    return res.json({ url });
  }
  if (body.action === "logout") {
    res.setHeader("Set-Cookie", "token=; Path=/; Max-Age=0; SameSite=Strict; HttpOnly; Secure");
    return res.json({ success: true });
  }
  const reqToken = getTokenFromRequest(req) || "";
  if (!verifyToken(reqToken)) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const headers = { Authorization: `Bot ${process.env.DISCORD_TOKEN}` };
  const guildId = process.env.GUILD_ID;
  try {
    if (body.action === "guildinfo") {
      const [guildRes, chanRes, rolesRes] = await Promise.all([
        discordFetch3(`https://discord.com/api/v10/guilds/${guildId}?with_counts=true`, { headers }),
        discordFetch3(`https://discord.com/api/v10/guilds/${guildId}/channels`, { headers }),
        discordFetch3(`https://discord.com/api/v10/guilds/${guildId}/roles`, { headers })
      ]);
      const guild = guildRes;
      const ownerRes = await discordFetch3(`https://discord.com/api/v10/users/${guild.owner_id}`, { headers });
      let bots = 0, humans = 0, totalMembers = guild.approximate_member_count || guild.member_count || "?";
      try {
        const members = await discordFetch3(`https://discord.com/api/v10/guilds/${guildId}/members?limit=1000`, { headers });
        bots = members.filter((m) => m.user?.bot).length;
        humans = members.length - bots;
        totalMembers = guild.approximate_member_count || guild.member_count || members.length;
      } catch {
      }
      let textCh = 0, voiceCh = 0, categoryCh = 0;
      for (const ch of chanRes) {
        if (ch.type === 0) textCh++;
        else if (ch.type === 2) voiceCh++;
        else if (ch.type === 4) categoryCh++;
      }
      let iconUrl = null;
      if (guild.icon) {
        const ext = guild.icon.startsWith("a_") ? ".gif" : ".png";
        iconUrl = `https://cdn.discordapp.com/icons/${guildId}/${guild.icon}${ext}?size=256`;
      }
      return res.json({
        name: guild.name,
        icon: iconUrl,
        owner: ownerRes.global_name || ownerRes.username,
        ownerId: guild.owner_id,
        totalMembers,
        bots,
        humans,
        channelCount: chanRes.length,
        textChannels: textCh,
        voiceChannels: voiceCh,
        categories: categoryCh,
        roleCount: rolesRes.length,
        roles: rolesRes.map((r) => ({ id: r.id, name: r.name, color: r.color, position: r.position, hoist: r.hoist })),
        created: new Date(Number(BigInt(guild.id) >> 22n) + 14200704e5).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) + " \xB7 " + new Date(Number(BigInt(guild.id) >> 22n) + 14200704e5).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
        createdTs: Number(BigInt(guild.id) >> 22n) + 14200704e5,
        boostLevel: guild.premium_tier || 0,
        boostCount: guild.premium_subscription_count || 0,
        features: guild.features || []
      });
    }
    if (body.action === "channels") {
      const channels = await discordFetch3(`https://discord.com/api/v10/guilds/${guildId}/channels`, { headers });
      return res.json({ channels });
    }
    if (body.action === "send") {
      if (!isValidSnowflake(body.channelId)) return res.status(400).json({ error: "Invalid channel ID" });
      const content = validateContent(body.content);
      if (content === null) return res.status(400).json({ error: "Invalid content (max 2000 chars)" });
      const form = new FormData();
      form.append("content", content);
      const file = validateFileUpload(body.fileData, body.fileName, body.fileType);
      if (file) form.append("file", file.blob, file.name);
      const response = await fetch(`https://discord.com/api/v10/channels/${body.channelId}/messages`, {
        method: "POST",
        headers: { ...headers },
        body: form
      });
      if (!response.ok) {
        let msg = `HTTP ${response.status}`;
        try {
          const d = await response.json();
          msg = d.message || msg;
        } catch {
        }
        throw new Error(msg);
      }
      return res.json({ success: true });
    }
    if (body.action === "messages") {
      if (!isValidSnowflake(body.channelId)) return res.status(400).json({ error: "Invalid channel ID" });
      try {
        const limit = parseLimit(body.limit, 30, 100);
        let url = `https://discord.com/api/v10/channels/${body.channelId}/messages?limit=${limit}`;
        if (body.before && isValidSnowflake(body.before)) url += `&before=${body.before}`;
        const messages = await discordFetch3(url, { headers });
        return res.json({ messages });
      } catch (e) {
        throw e;
      }
    }
    if (body.action === "delete") {
      if (!isValidSnowflake(body.channelId)) return res.status(400).json({ error: "Invalid channel ID" });
      if (!isValidSnowflake(body.messageId)) return res.status(400).json({ error: "Invalid message ID" });
      await discordFetch3(
        `https://discord.com/api/v10/channels/${body.channelId}/messages/${body.messageId}`,
        { method: "DELETE", headers }
      );
      return res.json({ success: true });
    }
    if (body.action === "members") {
      const [memberRes, rolesRes] = await Promise.all([
        discordFetch3(`https://discord.com/api/v10/guilds/${guildId}/members?limit=1000`, { headers }),
        discordFetch3(`https://discord.com/api/v10/guilds/${guildId}/roles`, { headers })
      ]);
      const members = Array.isArray(memberRes) ? memberRes : [];
      return res.json({ members, roles: rolesRes });
    }
    if (body.action === "userinfo") {
      if (!isValidSnowflake(body.userId)) return res.status(400).json({ error: "Invalid user ID" });
      const userRes = await discordFetch3(`https://discord.com/api/v10/users/${body.userId}`, { headers });
      return res.json(userRes);
    }
    if (body.action === "dm_channels") {
      const channels = await discordFetch3(`https://discord.com/api/v10/users/@me/channels`, { headers });
      return res.json({ channels });
    }
    if (body.action === "dm_messages") {
      if (!isValidSnowflake(body.channelId)) return res.status(400).json({ error: "Invalid channel ID" });
      const messages = await discordFetch3(
        `https://discord.com/api/v10/channels/${body.channelId}/messages?limit=${parseLimit(body.limit, 50, 100)}`,
        { headers }
      );
      return res.json({ messages });
    }
    if (body.action === "dm_send") {
      let channelId = body.channelId;
      if (!channelId && body.userId) {
        if (!isValidSnowflake(body.userId)) return res.status(400).json({ error: "Invalid user ID" });
        const ch = await discordFetch3(`https://discord.com/api/v10/users/@me/channels`, {
          method: "POST",
          headers,
          body: JSON.stringify({ recipient_id: body.userId })
        });
        channelId = ch.id;
      }
      if (!channelId) return res.status(400).json({ error: "No channel or user specified" });
      if (channelId && !isValidSnowflake(channelId)) return res.status(400).json({ error: "Invalid channel ID" });
      if (body.content || body.fileData) {
        const content = validateContent(body.content);
        if (content === null) return res.status(400).json({ error: "Invalid content (max 2000 chars)" });
        const form = new FormData();
        form.append("content", content);
        const file = validateFileUpload(body.fileData, body.fileName, body.fileType);
        if (file) form.append("file", file.blob, file.name);
        const response = await fetch(`https://discord.com/api/v10/channels/${channelId}/messages`, {
          method: "POST",
          headers: { ...headers },
          body: form
        });
        if (!response.ok) {
          let msg = `HTTP ${response.status}`;
          try {
            const d = await response.json();
            msg = d.message || msg;
          } catch {
          }
          throw new Error(msg);
        }
      }
      return res.json({ success: true, channelId });
    }
    if (body.action === "ban") {
      const userId = body.userId;
      if (!userId) return res.status(400).json({ error: "No user specified" });
      if (!isValidSnowflake(userId)) return res.status(400).json({ error: "Invalid user ID" });
      try {
        const banHeaders = { ...headers, "Content-Type": "application/json" };
        if (body.reason) banHeaders["X-Audit-Log-Reason"] = encodeURIComponent(String(body.reason).slice(0, 512));
        const banBody = {};
        if (body.deleteDays) banBody.delete_message_seconds = Math.min(Math.max(parseInt(String(body.deleteDays), 10) || 1, 0), 7) * 86400;
        await discordFetch3(
          `https://discord.com/api/v10/guilds/${guildId}/bans/${userId}`,
          { method: "PUT", headers: banHeaders, body: JSON.stringify(banBody) }
        );
        return res.json({ success: true });
      } catch (e) {
        return res.status(500).json({ error: e.message || "Failed to ban user" });
      }
    }
    if (body.action === "kick") {
      const userId = body.userId;
      if (!userId) return res.status(400).json({ error: "No user specified" });
      if (!isValidSnowflake(userId)) return res.status(400).json({ error: "Invalid user ID" });
      try {
        const kickHeaders = { ...headers };
        if (body.reason) kickHeaders["X-Audit-Log-Reason"] = encodeURIComponent(String(body.reason).slice(0, 512));
        await discordFetch3(
          `https://discord.com/api/v10/guilds/${guildId}/members/${userId}`,
          { method: "DELETE", headers: kickHeaders }
        );
        return res.json({ success: true });
      } catch (e) {
        return res.status(500).json({ error: e.message || "Failed to kick user" });
      }
    }
    if (body.action === "timeout") {
      const userId = body.userId;
      if (!userId) return res.status(400).json({ error: "No user specified" });
      if (!isValidSnowflake(userId)) return res.status(400).json({ error: "Invalid user ID" });
      try {
        const clampedMinutes = clampMinutes(body.minutes);
        const timeoutValue = clampedMinutes > 0 ? new Date(Date.now() + clampedMinutes * 60 * 1e3).toISOString() : null;
        const timeoutHeaders = { ...headers, "Content-Type": "application/json" };
        if (body.reason) timeoutHeaders["X-Audit-Log-Reason"] = encodeURIComponent(String(body.reason).slice(0, 512));
        await discordFetch3(
          `https://discord.com/api/v10/guilds/${guildId}/members/${userId}`,
          { method: "PATCH", headers: timeoutHeaders, body: JSON.stringify({ communication_disabled_until: timeoutValue }) }
        );
        return res.json({ success: true });
      } catch (e) {
        return res.status(500).json({ error: e.message || "Failed to timeout user" });
      }
    }
    if (body.action === "moderations") {
      try {
        const [bans, members] = await Promise.all([
          discordFetch3(`https://discord.com/api/v10/guilds/${guildId}/bans?limit=1000`, { headers }).catch(() => []),
          discordFetch3(`https://discord.com/api/v10/guilds/${guildId}/members?limit=1000`, { headers }).catch(() => [])
        ]);
        const now = (/* @__PURE__ */ new Date()).toISOString();
        const timeouts = (Array.isArray(members) ? members : []).filter((m) => m.communication_disabled_until && m.communication_disabled_until > now);
        return res.json({
          bans: Array.isArray(bans) ? bans : [],
          timeouts: timeouts.map((m) => ({ user: m.user, communication_disabled_until: m.communication_disabled_until, nick: m.nick }))
        });
      } catch (e) {
        return res.json({ bans: [], timeouts: [], error: e.message || "Failed to fetch moderations" });
      }
    }
    if (body.action === "bans") {
      try {
        const bans = await discordFetch3(
          `https://discord.com/api/v10/guilds/${guildId}/bans?limit=1000`,
          { headers }
        );
        return res.json({ bans: Array.isArray(bans) ? bans : [] });
      } catch (e) {
        return res.json({ bans: [], error: e.message || "Failed to fetch bans" });
      }
    }
    if (body.action === "unban") {
      const userId = body.userId;
      if (!userId) return res.status(400).json({ error: "No user specified" });
      if (!isValidSnowflake(userId)) return res.status(400).json({ error: "Invalid user ID" });
      try {
        await discordFetch3(
          `https://discord.com/api/v10/guilds/${guildId}/bans/${userId}`,
          { method: "DELETE", headers }
        );
        return res.json({ success: true });
      } catch (e) {
        return res.status(500).json({ error: e.message || "Failed to unban" });
      }
    }
    if (body.action === "edit") {
      if (!isValidSnowflake(body.channelId)) return res.status(400).json({ error: "Invalid channel ID" });
      if (!isValidSnowflake(body.messageId)) return res.status(400).json({ error: "Invalid message ID" });
      const content = validateContent(body.content);
      if (content === null) return res.status(400).json({ error: "Invalid content (max 2000 chars)" });
      try {
        await discordFetch3(
          `https://discord.com/api/v10/channels/${body.channelId}/messages/${body.messageId}`,
          { method: "PATCH", headers: { ...headers, "Content-Type": "application/json" }, body: JSON.stringify({ content }) }
        );
        return res.json({ success: true });
      } catch (e) {
        return res.status(500).json({ error: e.message || "Failed to edit message" });
      }
    }
    if (body.action === "audit_log") {
      try {
        const limit = parseLimit(body.limit, 25, 100);
        const log = await discordFetch3(
          `https://discord.com/api/v10/guilds/${guildId}/audit-logs?limit=${limit}`,
          { headers }
        );
        return res.json({ entries: log.audit_log_entries || [], users: log.users || [], roles: log.roles || [] });
      } catch (e) {
        return res.status(500).json({ error: e.message || "Failed to fetch audit log" });
      }
    }
    if (body.action === "invites") {
      try {
        const invites = await discordFetch3(
          `https://discord.com/api/v10/guilds/${guildId}/invites`,
          { headers }
        );
        return res.json({ invites: Array.isArray(invites) ? invites : [] });
      } catch (e) {
        return res.status(500).json({ error: e.message || "Failed to fetch invites" });
      }
    }
    if (body.action === "delete_invite") {
      if (!body.inviteCode) return res.status(400).json({ error: "No invite code" });
      try {
        await discordFetch3(
          `https://discord.com/api/v10/guilds/${guildId}/invites/${encodeURIComponent(body.inviteCode)}`,
          { method: "DELETE", headers }
        );
        return res.json({ success: true });
      } catch (e) {
        return res.status(500).json({ error: e.message || "Failed to delete invite" });
      }
    }
    if (body.action === "emojis") {
      try {
        const emojis = await discordFetch3(
          `https://discord.com/api/v10/guilds/${guildId}/emojis`,
          { headers }
        );
        return res.json({ emojis: Array.isArray(emojis) ? emojis : [] });
      } catch (e) {
        return res.status(500).json({ error: e.message || "Failed to fetch emojis" });
      }
    }
    if (body.action === "events") {
      try {
        const events = await discordFetch3(
          `https://discord.com/api/v10/guilds/${guildId}/scheduled-events?with_user_count=true`,
          { headers }
        );
        return res.json({ events: Array.isArray(events) ? events : [] });
      } catch (e) {
        return res.status(500).json({ error: e.message || "Failed to fetch events" });
      }
    }
    if (body.action === "create_event") {
      try {
        const name = typeof body.name === "string" ? body.name.trim().slice(0, 100) : "";
        if (!name) return res.status(400).json({ error: "Event name required" });
        const eventBody = { name, scheduled_start_time: body.startTime || new Date(Date.now() + 36e5).toISOString() };
        if (body.endTime) eventBody.scheduled_end_time = body.endTime;
        if (body.description) eventBody.description = String(body.description).slice(0, 1e3);
        if (body.channelId && isValidSnowflake(body.channelId)) eventBody.channel_id = body.channelId;
        const event = await discordFetch3(
          `https://discord.com/api/v10/guilds/${guildId}/scheduled-events`,
          { method: "POST", headers: { ...headers, "Content-Type": "application/json" }, body: JSON.stringify(eventBody) }
        );
        return res.json({ success: true, event });
      } catch (e) {
        return res.status(500).json({ error: e.message || "Failed to create event" });
      }
    }
    if (body.action === "delete_event") {
      if (!body.eventId) return res.status(400).json({ error: "No event ID" });
      try {
        await discordFetch3(
          `https://discord.com/api/v10/guilds/${guildId}/scheduled-events/${body.eventId}`,
          { method: "DELETE", headers }
        );
        return res.json({ success: true });
      } catch (e) {
        return res.status(500).json({ error: e.message || "Failed to delete event" });
      }
    }
    if (body.action === "create_channel") {
      try {
        const chName = typeof body.name === "string" ? body.name.trim().replace(/[^\w\-]/g, "-").slice(0, 100) : "";
        if (!chName) return res.status(400).json({ error: "Channel name required" });
        const chBody = { name: chName, type: parseInt(String(body.type), 10) || 0 };
        if (body.topic) chBody.topic = String(body.topic).slice(0, 1024);
        if (body.categoryId && isValidSnowflake(body.categoryId)) chBody.parent_id = body.categoryId;
        const ch = await discordFetch3(
          `https://discord.com/api/v10/guilds/${guildId}/channels`,
          { method: "POST", headers: { ...headers, "Content-Type": "application/json" }, body: JSON.stringify(chBody) }
        );
        return res.json({ success: true, channel: ch });
      } catch (e) {
        return res.status(500).json({ error: e.message || "Failed to create channel" });
      }
    }
    if (body.action === "delete_channel") {
      if (!isValidSnowflake(body.channelId)) return res.status(400).json({ error: "Invalid channel ID" });
      try {
        await discordFetch3(
          `https://discord.com/api/v10/channels/${body.channelId}`,
          { method: "DELETE", headers }
        );
        return res.json({ success: true });
      } catch (e) {
        return res.status(500).json({ error: e.message || "Failed to delete channel" });
      }
    }
    if (body.action === "add_role") {
      if (!isValidSnowflake(body.userId)) return res.status(400).json({ error: "Invalid user ID" });
      if (!isValidSnowflake(body.roleId)) return res.status(400).json({ error: "Invalid role ID" });
      try {
        await discordFetch3(
          `https://discord.com/api/v10/guilds/${guildId}/members/${body.userId}/roles/${body.roleId}`,
          { method: "PUT", headers }
        );
        return res.json({ success: true });
      } catch (e) {
        return res.status(500).json({ error: e.message || "Failed to add role" });
      }
    }
    if (body.action === "remove_role") {
      if (!isValidSnowflake(body.userId)) return res.status(400).json({ error: "Invalid user ID" });
      if (!isValidSnowflake(body.roleId)) return res.status(400).json({ error: "Invalid role ID" });
      try {
        await discordFetch3(
          `https://discord.com/api/v10/guilds/${guildId}/members/${body.userId}/roles/${body.roleId}`,
          { method: "DELETE", headers }
        );
        return res.json({ success: true });
      } catch (e) {
        return res.status(500).json({ error: e.message || "Failed to remove role" });
      }
    }
    if (body.action === "edit_guild") {
      try {
        const patchBody = {};
        if (body.name && typeof body.name === "string") {
          const n = body.name.trim().slice(0, 100);
          if (n) patchBody.name = n;
        }
        if (body.icon && typeof body.icon === "string") {
          patchBody.icon = body.icon;
        }
        if (!Object.keys(patchBody).length) return res.status(400).json({ error: "Nothing to update" });
        const guild = await discordFetch3(
          `https://discord.com/api/v10/guilds/${guildId}`,
          { method: "PATCH", headers: { ...headers, "Content-Type": "application/json" }, body: JSON.stringify(patchBody) }
        );
        return res.json({ success: true, guild });
      } catch (e) {
        return res.status(500).json({ error: e.message || "Failed to update guild" });
      }
    }
    if (body.action === "guild_activity") {
      try {
        const members = await discordFetch3(
          `https://discord.com/api/v10/guilds/${guildId}/members?limit=1000&sort=joined_at&desc=true`,
          { headers }
        ).catch(() => []);
        const now = Date.now();
        const day = 864e5;
        const last7d = (Array.isArray(members) ? members : []).filter((m) => {
          const joined = new Date(m.joined_at).getTime();
          return now - joined < 7 * day;
        });
        const recentJoins = last7d.slice(0, 20).map((m) => ({
          user: m.user,
          joined_at: m.joined_at,
          nick: m.nick
        }));
        let bans = [];
        try {
          const banList = await discordFetch3(`https://discord.com/api/v10/guilds/${guildId}/bans?limit=100`, { headers });
          bans = Array.isArray(banList) ? banList.slice(0, 20) : [];
        } catch {
        }
        return res.json({ recentJoins, bans, totalJoins7d: last7d.length });
      } catch (e) {
        return res.json({ recentJoins: [], bans: [], totalJoins7d: 0, error: e.message });
      }
    }
    return res.status(400).json({ error: "Unknown action" });
  } catch (err) {
    return res.status(500).json({
      error: err?.message || "Request failed"
    });
  }
}
/*! Bundled license information:

@google/generative-ai/dist/index.mjs:
@google/generative-ai/dist/index.mjs:
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
*/
