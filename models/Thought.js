const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: { 
            type: Schema.Types.ObjectId, 
            default: () => new Types.ObjectId(),
        },
        reactionBody: { 
            type: String, 
            required: true,
            maxLength: 280
        },
        username: {
            type: String, 
            required: true,
        },
        createdAt: {
            type: Date, 
            default: Date.now,
            get: timeFormat => timeFormat.toLocaleString(),
        }
    },
    {
        toJSON: {
            getters: true,
        }
    }
);

const thoughtSchema = new Schema(
    {
        thoughtText: { 
            type: String, 
            required: true, 
            minLength: 1,
            maxLength: 280
        },
        createdAt: { 
            type: Date, 
            default: Date.now,
            get: timeFormat => timeFormat.toLocaleString(),
        },
        username: { 
            type: String, 
            required: true, 
        },
        reactions: [reactionSchema],
        lastAccessed: { 
            type: Date, 
            default: Date.now 
        },
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    },
);

thoughtSchema
    // naming the virtual function
    .virtual('reactionCount')
    // The GETTER function
    .get(function() {
        return this.reactions.length;
    });

const Thought = model('thought', thoughtSchema);

module.exports =  Thought ;