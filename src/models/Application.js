import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  internship: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Internship',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  },
  resume: {
    filename: String,
    contentType: String,
    data: String, // base64 string
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// Ensure a student can only apply once to an internship
applicationSchema.index({ student: 1, internship: 1 }, { unique: true });

const Application = mongoose.models.Application || mongoose.model('Application', applicationSchema);
export default Application; 